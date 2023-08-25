using System.Data;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Xml;

namespace Sisk.GenerateMdDoc
{
    internal class Program
    {
        class DocLink
        {
            public string Title { get; set; }
            public string Href { get; set; }
            public string? Icon { get; set; }

            public DocLink(String title, String href, String? icon)
            {
                Title = title ?? throw new ArgumentNullException(nameof(title));
                Href = href ?? throw new ArgumentNullException(nameof(href));
                Icon = icon;
            }
        }

        struct StParam
        {
            public string Name;
            public string Summary;

            public override string ToString() => Name;
        }

        struct StMember
        {
            public string Filename;
            public string Name;
            public string DeclaringName;
            public string ParentType;
            public string Role;
            public string Definition;
            public string Summary;
            public string Remarks;
            public string Docs;
            public List<StParam> Parameters;

            public override string ToString() => DeclaringName;
        }

        struct StType
        {
            public string ShortName;
            public string FullName;
            public string Type;
            public string Definition;
            public string Summary;
            public string Assembly;
            public string Docs;
            public List<StMember> Members;

            public override string ToString() => FullName;
        }

        protected static string NormalizeSummary(string s) => Regex.Replace(s, @"\s{2,}", " ").Trim();
        protected static string NormalizeCodeWhitespace(string s) => Regex.Replace(s, @"^\s+", "", RegexOptions.Multiline).Trim();

        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                Console.WriteLine("Sisk XML file is required in order to run the spec generator.");
                return;
            }

            List<StType> typeList = new List<StType>();

            for (int i = 0; i < args.Length; i++)
            {
                string filePath = args[i];

                if (!File.Exists(filePath))
                {
                    Console.WriteLine("Specified file was not found: " + filePath);
                    return;
                }

                string fileAssemblyName = Path.GetFileNameWithoutExtension(filePath);
                string fileContents = File.ReadAllText(filePath);

                XmlDocument doc = new XmlDocument();
                doc.LoadXml(fileContents);

                var members = doc.SelectNodes("/doc/members/member")!;

                File.WriteAllText("Output/index.md", """
                    # Specification

                    You are viewing the Sisk API specification. Navigate from the sidebar to get started.
                    """);

                foreach (XmlNode member in members)
                {
                    if (member.SelectSingleNode("nodocs") != null) continue;

                    string name = member.Attributes!["name"]!.Value;
                    string type = member.SelectSingleNode("type")?.InnerText.Trim() ?? "Type";
                    string definition = NormalizeCodeWhitespace(member.SelectSingleNode("definition")?.InnerText.Trim() ?? "");
                    string summary = NormalizeSummary(member.SelectSingleNode("summary")!.InnerXml.Trim());

                    Console.WriteLine("Reading {0}...", name);

                    // replace sisk type names and namespaces
                    summary = Regex.Replace(summary, @"<see cref=""T:Sisk\.([^""]+)""\s?/>", @"<a href=""/read?q=/contents/spec/Sisk.$1.md"">Sisk.$1</a>");
                    // replace sisk method properties etc
                    summary = Regex.Replace(summary, @"<see cref=""[^T]:(Sisk\.[a-zA-Z0-9.]+)\.([a-zA-Z0-9.]+)""\s?/>", @"<a href=""/read?q=/contents/spec/$1.md"">$2</a>");
                    // replace .net types by their link
                    summary = Regex.Replace(summary, @"<see cref=""T:System\.([^""]+)""\s?/>", @"<a href=""https://learn.microsoft.com/en-us/dotnet/api/System.$1"">System.$1</a>");
                    // replace .net method properties etc
                    summary = Regex.Replace(summary, @"<see cref=""[^T]:(System\.[a-zA-Z0-9.]+)\.([a-zA-Z0-9.]+)""\s?/>", @"<a href=""https://learn.microsoft.com/en-us/dotnet/api/$1.$2"">$2</a>");
                    // replace to get only the first name from a links
                    summary = Regex.Replace(summary, @">[a-zA-Z0-9.]+\.(\w+)</a>", @">$1</a>");

                    string docs = member.SelectSingleNode("docs")?.InnerXml.Trim() ?? "";
                    string nameType = name.Substring(0, 2);
                    name = name.Substring(2)
                        .Replace("`1", "")
                        .Replace("``1", "")
                        .Replace("``0", "");
                    definition = definition.Replace("{{", "<").Replace("}}", ">");

                    if (nameType == "T:")
                    {
                        typeList.Add(new StType
                        {
                            ShortName = name.Substring(name.LastIndexOf(".") + 1),
                            FullName = name,
                            Type = type,
                            Definition = definition,
                            Summary = summary,
                            Assembly = fileAssemblyName,
                            Docs = docs,
                            Members = new List<StMember>()
                        });
                    }
                    else
                    {
                        string nameWithoutArgs = name;
                        string parent = "";
                        if (name.Contains('('))
                        {
                            parent = name.Substring(0, name.IndexOf('('));
                            nameWithoutArgs = parent;
                            parent = parent.Substring(0, parent.LastIndexOf('.'));
                        }
                        else
                        {
                            parent = name.Substring(0, name.LastIndexOf('.'));
                        }
                        string remarks = member.SelectSingleNode("remarks")?.InnerXml.Trim() ?? "";
                        string declaringName = nameWithoutArgs.Substring(nameWithoutArgs.LastIndexOf('.') + 1);

                        if (declaringName == "#ctor")
                        {
                            declaringName = parent.Substring(parent.LastIndexOf('.') + 1);
                            nameWithoutArgs = declaringName;
                        }

                        if (nameType == "M:")
                        {
                            if (name.Contains('('))
                            {
                                string @params = name.Substring(name.IndexOf('('));
                                List<string> newParams = new List<string>();

                                foreach (string s in @params.TrimStart('(').TrimEnd(')').Split(","))
                                {
                                    bool isNullable = s.Contains("System.Nullable{");
                                    string part = "";
                                    if (s.Contains("{"))
                                    {
                                        string piece = s.Substring(s.LastIndexOf('{') + 1).TrimEnd('}');
                                        part = piece.Substring(piece.LastIndexOf('.') + 1);
                                    }
                                    else
                                    {
                                        part = s.Substring(s.LastIndexOf('.') + 1);
                                    }

                                    part = part switch
                                    {
                                        "String" => "string",
                                        "Boolean" => "bool",
                                        "Int32" => "int",
                                        "Int16" => "short",
                                        "Int64" => "long",
                                        "Char" => "char",
                                        "Double" => "double",
                                        "Single" => "float",
                                        _ => part
                                    };

                                    if (isNullable) part += "?";

                                    newParams.Add(part);
                                }

                                declaringName += "(" + string.Join(", ", newParams) + ")";
                            }
                            else
                            {
                                declaringName += "()";
                            }
                        }

                        var parameters = new List<StParam>();
                        foreach (XmlNode paramNode in member.SelectNodes("param")!)
                        {
                            string paramName = paramNode.Attributes!["name"]!.Value;
                            string paramDescription = paramNode.InnerText;
                            parameters.Add(new StParam() { Name = paramName, Summary = paramDescription });
                        }

                        string dRole = "";
                        if (name.Contains("#ctor"))
                        {
                            dRole = "Constructor";
                        }
                        else
                        {
                            dRole = nameType switch
                            {
                                "M:" => "Method",
                                "P:" => "Property",
                                "F:" => "Field",
                                "E:" => "Event",
                                _ => throw new NotImplementedException()
                            };
                        }

                        string fileName = parent + "." + declaringName;
                        fileName = fileName.Replace("[", "");
                        fileName = fileName.Replace("]", "");
                        fileName = fileName.Replace("?", "");
                        fileName = fileName.Replace(", ", "-");

                        typeList.First(t => t.FullName == parent).Members.Add(new StMember
                        {
                            Name = name.Replace("#ctor", nameWithoutArgs),
                            DeclaringName = declaringName,
                            Definition = definition,
                            ParentType = parent,
                            Role = dRole,
                            Summary = summary,
                            Remarks = remarks,
                            Parameters = parameters,
                            Filename = fileName,
                            Docs = docs
                        });
                    }
                }
            }

            // types files
            List<dynamic> links = new List<dynamic>();
            string lastNamespace = "";

            foreach (StType type in typeList.OrderBy(t => t.FullName).ToArray())
            {
                Console.WriteLine("Creating doc for type {0}...", type.FullName);

                string nsmsp = type.FullName.Substring(0, type.FullName.LastIndexOf('.'));
                if (lastNamespace != nsmsp)
                {
                    links.Add(nsmsp);
                    lastNamespace = nsmsp;
                }

                links.Add(new DocLink(type.ShortName, "/contents/spec/" + type.FullName + ".md", type.Type.ToLower()));

                string fileName = type.FullName + ".md";
                StringBuilder typeFile = new StringBuilder();

                typeFile.AppendLine("""
                    <!--
                    
                    Copyrights 2023 Sisk Framework - CypherPotato
                    Published under MIT license
                    
                    !!! DO NOT EDIT THIS FILE !!!
                    This file was generated by a tool in the Sisk package. To edit the information in this documentation,
                    edit the XML documentation present in the Sisk source code.
                    
                    -->

                    """);

                typeFile.AppendLine($"# {type.ShortName} {type.Type.ToLower()}");

                if (!string.IsNullOrEmpty(type.Assembly))
                {
                    typeFile.AppendLine($"""
                        Assembly: {type.Assembly}
                       
                        Namespace: {nsmsp}
                        """);
                }
                if (!string.IsNullOrEmpty(type.Definition))
                {
                    typeFile.AppendLine($"""

                        Definition:

                        ```cs
                        {type.Definition}
                        ```
                        """);
                }
                if (!string.IsNullOrEmpty(type.Summary))
                {
                    typeFile.AppendLine($"""

                        {type.Summary}

                        """);
                }
                if (!string.IsNullOrEmpty(type.Docs))
                {
                    typeFile.AppendLine($"""

                        {type.Docs}

                        """);
                }

                var roles = type.Members.Select(m => m.Role).Distinct().ToArray();
                foreach (string role in roles)
                {
                    StMember[] roleMembers = type.Members
                        .Where(m => m.Role == role)
                        .OrderBy(m => m.Name)
                        .ToArray();
                    if (roleMembers.Length == 0) return;

                    string roleId = role.Replace(" ", "-").ToLower();

                    typeFile.AppendLine($"""
                        # {role} list
                        <table>
                            <tbody>
                        """);

                    foreach (StMember member in roleMembers)
                    {
                        typeFile.AppendLine($"""
                                <tr>
                                    <td width="33%">
                                        <img class="icon" src="/assets/img/icons/{member.Role.ToLower()}.svg">
                                        <a href="/read?q=/contents/spec/{member.Filename}.md">
                                            {member.DeclaringName}
                                        </a>
                                    </td>
                                    <td>
                                        {member.Summary}
                                    <td>
                                </tr>
                                """);
                    }
                    typeFile.AppendLine($"""
                            </tbody>
                        </table>
                        """);
                }

                string mk = typeFile.ToString();
                File.WriteAllText("Output/" + fileName, mk);
            }

            // members files
            foreach (StType type in typeList)
            {
                foreach (StMember member in type.Members)
                {
                    Console.WriteLine("Creating doc for member {0}...", member.Name);

                    StringBuilder md = new StringBuilder();
                    md.AppendLine($"""
                            <!--

                            Copyrights 2023 Sisk Framework - CypherPotato
                            Published under MIT license

                            !!! DO NOT EDIT THIS FILE !!!
                            This file was generated by a tool in the Sisk package. To edit the information in this documentation,
                            edit the XML documentation present in the Sisk source code.

                            -->


                            # {member.DeclaringName} {member.Role.ToLower()}

                            Declaring type: [{member.ParentType}](/read?q=/contents/spec/{member.ParentType}.md) (from {type.Assembly})

                            """);
                    if (!string.IsNullOrEmpty(member.Definition))
                    {
                        md.AppendLine($"""

                            Definition:

                            ```cs
                            {member.Definition}
                            ```
                            """);
                    }
                    if (!string.IsNullOrEmpty(member.Summary))
                    {
                        md.AppendLine($"""
                           
                            {member.Summary}

                            """);
                    }
                    if (!string.IsNullOrEmpty(member.Docs))
                    {
                        md.AppendLine($"""
                            
                            {member.Docs}

                            """);
                    }
                    if (!string.IsNullOrEmpty(member.Remarks))
                    {
                        md.AppendLine($"""
                            > **Remarks:**
                            >
                            > {member.Remarks}
                            """);
                    }
                    if (member.Parameters.Count > 0)
                    {
                        md.AppendLine($"""
                            
                            # Parameters

                            <table>
                                <tbody>
                            """);
                        foreach (StParam param in member.Parameters)
                        {
                            md.AppendLine($"""
                                <tr>
                                    <td width="33%">{param.Name}</td>
                                    <td>{param.Summary}</td>
                                </tr>
                                """);
                        }
                        md.AppendLine($"""
                            </tbody>
                        </table>
                        """);
                    }

                    string rawHtml = md.ToString();
                    File.WriteAllText("Output/" + member.Filename + ".md", rawHtml);
                }
            }

            string specJs = "var specsIndex = ";
            specJs += JsonSerializer.Serialize(links, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            }) + ";";

            File.WriteAllText("Output/spec.js", specJs);

            Console.WriteLine("Done!");
        }
    }
}