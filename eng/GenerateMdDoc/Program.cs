using Newtonsoft.Json.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;

namespace Sisk.GenerateMdDoc
{
    internal class Program
    {
        enum DocMemberType
        {
            Type,
            Property,
            Method
        }

        protected static string NormalizeSummary(string s)
        {
            return Regex.Replace(s, @"\s{2,}", " ").Trim();
        }

        protected static string NormalizeCode(string code)
        {
            return Regex.Replace(code, @"^\s+", "", RegexOptions.Multiline).Trim();
        }

        class DocMember
        {
            public string Name { get; set; }
            public string Summary { get; set; }
            public string? Definition { get; set; }
            public string Namespace { get; set; }

            public string DefinitionType { get; set; }
            public DocMemberType MemberType { get; set; }

            public Dictionary<string, string> Parameters { get; set; } = new Dictionary<string, string>();

            public string? Signature { get; set; }

            public override string ToString() => Name;

            public string GetParent()
            {
                string sName = StripArguments(Name);
                return sName.Substring(0, sName.LastIndexOf('.'));
            }

            public string GetLink()
            {
                if (MemberType == DocMemberType.Method)
                {
                    string s = Program.StripArguments(Name).Replace('.', '/').Replace('#', '_') + $"--{Signature?.Replace(", ", "-") ?? ""}";
                    return s;
                }
                else
                {
                    return Name.Replace('.', '/');
                }
            }

            protected static string ParseSummary(XmlNode rootToken)
            {
                XmlNode? summaryNode = rootToken.SelectSingleNode("summary");
                string result = "";
                if (summaryNode != null)
                {
                    StringBuilder sb = new StringBuilder();

                    XmlNode[] childrens = summaryNode.ChildNodes.Cast<XmlNode>().ToArray();
                    foreach (XmlNode child in childrens)
                    {
                        if (child.NodeType == XmlNodeType.Text)
                        {
                            sb.Append(child.InnerText);
                        }
                        else
                        {
                            string seeHref = child.Attributes!["cref"]!.Value;
                            string seePieceLink = seeHref.Substring(2).Replace('.', '/');
                            string seePiece = seeHref.Split('.').Last();

                            sb.Append($" [{seePiece}](/spec/{seePieceLink}) ");
                        }
                    }

                    result = sb.ToString();
                }

                return NormalizeSummary(result);
            }

            public static DocMember? BuildFromJToken(XmlNode token)
            {
                DocMember member = new DocMember();
                string rawName = token.Attributes!["name"]!.Value;
                member.Name = rawName.Substring(2);
                member.Summary = ParseSummary(token);
                member.Definition = NormalizeCode(token.SelectSingleNode("definition")?.InnerText.Trim() ?? "");
                member.Namespace = token.SelectSingleNode("namespace")?.InnerText.Trim() ?? "";
                member.DefinitionType = token.SelectSingleNode("type")?.InnerText.Trim() ?? "";

                if (member.Name.Contains("("))
                {
                    string[] types = Regex.Matches(member.Name, @"(?!.*\()\.([\w\[\]]+)[,\)]").Select(m => m.Groups[1].Value).ToArray();
                    string signature = string.Join(", ", types);
                    member.Signature = signature;
                }

                foreach (XmlNode paramNode in token.SelectNodes("param")!)
                {
                    member.Parameters.Add(paramNode.Attributes!["name"]!.Value, paramNode.InnerText);
                }

                if (rawName.StartsWith("T:"))
                {
                    member.MemberType = DocMemberType.Type;
                }
                else if (rawName.StartsWith("M:"))
                {
                    member.MemberType = DocMemberType.Method;
                }
                else if (rawName.StartsWith("P:"))
                {
                    member.MemberType = DocMemberType.Property;
                }

                return member;
            }
        }

        static string GetMemberName(string memberName)
        {
            string strippedMemberName = StripArguments(memberName);
            return strippedMemberName.Substring(strippedMemberName.LastIndexOf('.') + 1);
        }

        static string StripArguments(string s) => s.Contains('(') ? s.Substring(0, s.IndexOf('(')) : s;

        static bool IsChildOf(string child, string parent)
        {
            string stripedChild = StripArguments(child);
            string stripedParent = StripArguments(parent);

            return (stripedChild.Split('.').Length - 1 == stripedParent.Split('.').Length
                 && stripedChild.StartsWith(stripedParent + "."));
        }

        static void Main(string[] args)
        {
            JObject test = new JObject();

            if (args.Length == 0)
            {
                Console.WriteLine("XML input file is necessary.");
            }
            if (!File.Exists(args[0]))
            {
                Console.WriteLine("XML input file not found.");
            }

            string xmlDocFile = File.ReadAllText(args[0]);

            JObject jsonObj = JObject.FromObject(new
            {
                title = "Specification",
                links = new object[] { }
            });

            XmlDocument doc = new XmlDocument();
            doc.LoadXml(xmlDocFile);

            List<dynamic> docuteJson = new List<dynamic>();
            List<DocMember> docMembers = new List<DocMember>();

            foreach (XmlNode node in doc.SelectNodes("/doc/members/member")!)
            {
                DocMember? m = DocMember.BuildFromJToken(node);
                if (m is null) continue;
                docMembers.Add(m);
            }

            // build markdown for classes
            foreach (DocMember member in docMembers)
            {
                StringBuilder sb = new StringBuilder();

                DocMember[] properties = docMembers.Where(d =>
                    d.DefinitionType == "Property" && IsChildOf(d.Name, member.Name)).ToArray();
                DocMember[] methods = docMembers.Where(d =>
                    d.DefinitionType == "Method" && IsChildOf(d.Name, member.Name)).ToArray();
                DocMember[] constructor = docMembers.Where(d =>
                    d.DefinitionType == "Constructor" && IsChildOf(d.Name, member.Name)).ToArray();

                sb.AppendLine($"# {member.DefinitionType} {GetMemberName(member.Name)}");
                sb.AppendLine("Last updated: " + DateTime.Now.ToString("dddd, dd MMMM yyyy", new System.Globalization.CultureInfo("en")));
                sb.AppendLine();
                sb.AppendLine("## Definition");
                sb.AppendLine($"Namespace: {member.Namespace}");
                sb.AppendLine();

                if (!string.IsNullOrEmpty(member.Definition))
                {
                    sb.AppendLine("```csharp");
                    sb.AppendLine(member.Definition);
                    sb.AppendLine("```");
                    sb.AppendLine();
                }

                sb.AppendLine(member.Summary);
                sb.AppendLine();

                if (properties.Length > 0)
                {
                    sb.AppendLine("## Properties");
                    sb.AppendLine();
                    sb.AppendLine("| Property name | Description |");
                    sb.AppendLine("| --- | --- |");
                    foreach (DocMember property in properties)
                    {
                        sb.AppendLine($"| [{GetMemberName(property.Name)}](/spec/{property.GetLink()}) | {property.Summary} | ");
                    }
                    sb.AppendLine();
                }

                if (methods.Length > 0)
                {
                    sb.AppendLine("## Methods");
                    sb.AppendLine();
                    sb.AppendLine("| Method name | Description |");
                    sb.AppendLine("| --- | --- |");
                    foreach (DocMember method in methods)
                    {
                        sb.AppendLine($"| [{GetMemberName(method.Name)}({method.Signature})](/spec/{method.GetLink()}) | {method.Summary} | ");
                    }
                    sb.AppendLine();
                }

                if (constructor.Length > 0)
                {
                    sb.AppendLine("## Constructors");
                    sb.AppendLine();
                    sb.AppendLine("| Method name | Description |");
                    sb.AppendLine("| --- | --- |");
                    foreach (DocMember method in constructor)
                    {
                        sb.AppendLine($"| [{GetMemberName(member.Name)}({method.Signature})](/spec/{method.GetLink()}) | {method.Summary} | ");
                    }
                    sb.AppendLine();
                }

                if (member.Parameters.Count > 0)
                {
                    sb.AppendLine("## Parameters");
                    sb.AppendLine();
                    sb.AppendLine("| Key | Value |");
                    sb.AppendLine("| --- | --- |");
                    foreach (KeyValuePair<string, string> pair in member.Parameters)
                    {
                        sb.AppendLine($"| {pair.Key} | {pair.Value} | ");
                    }
                    sb.AppendLine();
                }

                string fullPath = "Output/" + member.GetLink() + ".md";
                string dirPath = Path.GetDirectoryName(fullPath)!;
                string parentName = member.GetParent();

                if (!Directory.Exists(dirPath))
                {
                    Directory.CreateDirectory(dirPath);
                }

                File.WriteAllText(fullPath, sb.ToString());

                // get the links location
                string fullName = StripArguments(member.Name).Replace("Sisk.Core.", "");
                JToken? token = jsonObj.SelectToken("$." + fullName);
                if (token == null)
                {
                    CreateRecursive(jsonObj, fullName, "/spec/" + member.GetLink());
                }

                docuteJson.Add(new
                {
                    title = StripArguments(member.Name).Replace("Sisk.Core.", ""),
                    link = "/spec/" + member.GetLink()
                });
            }

            File.WriteAllText("nasted-links.json", Newtonsoft.Json.JsonConvert.SerializeObject(jsonObj, Newtonsoft.Json.Formatting.Indented));
            File.WriteAllText("docute-links.json", Newtonsoft.Json.JsonConvert.SerializeObject(docuteJson, Newtonsoft.Json.Formatting.Indented));
        }

        static Dictionary<string, string> JsonPaths = new Dictionary<string, string>();

        static void CreateRecursive(JObject obj, string path, string finalLink)
        {
            JObject selected = obj;
            string[] pathParts = path.Split('.');

            string actualCursor = "$";
            for (int i = 0; i < pathParts.Length; i++)
            {
                actualCursor += "." + pathParts[i];
                bool isLast = i == pathParts.Length - 1;

                if (isLast)
                {
                    var finalObj = JObject.FromObject(new
                    {
                        title = pathParts[i],
                        link = finalLink
                    });
                    (selected.SelectToken("links")! as JArray)!.Add(finalObj);
                    return;
                }

                if (JsonPaths.ContainsKey(actualCursor))
                {
                    selected = (obj.SelectToken(JsonPaths[actualCursor]) as JObject)!;
                }
                else
                {
                    var newJobj = JObject.FromObject(new
                    {
                        title = pathParts[i],
                        links = new object[] { }
                    });
                    (selected.SelectToken("links")! as JArray)!.Add(newJobj);
                    selected = newJobj;
                }

                if (!JsonPaths.ContainsKey(actualCursor)) JsonPaths.Add(actualCursor, selected.Path);
            }
        }
    }
}