using System.Data;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using System.Xml.Linq;

namespace Sisk.GenerateMdDoc
{
    internal class Program
    {
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
            public List<StMember> Members;

            public override string ToString() => FullName;
        }

        protected static string NormalizeSummary(string s) => Regex.Replace(s, @"\s{2,}", " ").Trim();

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
                    Console.WriteLine("Specified file was not found.");
                    return;
                }

                string fileAssemblyName = Path.GetFileNameWithoutExtension(filePath);
                string fileContents = File.ReadAllText(filePath);

                XmlDocument doc = new XmlDocument();
                doc.LoadXml(fileContents);

                var members = doc.SelectNodes("/doc/members/member")!;

                foreach (XmlNode member in members)
                {
                    string name = member.Attributes!["name"]!.Value;
                    string type = member.SelectSingleNode("type")?.InnerText.Trim() ?? "Type";
                    string definition = member.SelectSingleNode("definition")?.InnerText.Trim() ?? "";
                    string summary = NormalizeSummary(member.SelectSingleNode("summary")!.InnerXml.Trim());

                    // replace sisk type names and namespaces
                    summary = Regex.Replace(summary, @"<see cref=""T:Sisk\.([^""]+)""\s?/>", @"<a href=""/spec/Sisk.$1"">Sisk.$1</a>");
                    // replace sisk method properties etc
                    summary = Regex.Replace(summary, @"<see cref=""[^T]:(Sisk\.[a-zA-Z0-9.]+)\.([a-zA-Z0-9.]+)""\s?/>", @"<a href=""/spec/$1"">$2</a>");
                    // replace .net types by their link
                    summary = Regex.Replace(summary, @"<see cref=""T:System\.([^""]+)""\s?/>", @"<a href=""https://learn.microsoft.com/en-us/dotnet/api/System.$1"">System.$1</a>");
                    // replace .net method properties etc
                    summary = Regex.Replace(summary, @"<see cref=""[^T]:(System\.[a-zA-Z0-9.]+)\.([a-zA-Z0-9.]+)""\s?/>", @"<a href=""https://learn.microsoft.com/en-us/dotnet/api/$1.$2"">$2</a>");
                    // replace to get only the first name from a links
                    summary = Regex.Replace(summary, @">[a-zA-Z0-9.]+\.(\w+)</a>", @">$1</a>");

                    string nameType = name.Substring(0, 2);
                    name = name.Substring(2);

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
                            Filename = fileName
                        });
                    }
                }
            }

            // types files
            StringBuilder indexPage = new StringBuilder();
            StringBuilder componentBuilder = new StringBuilder();
            componentBuilder.AppendLine("""<div class="doc-navigator">""");
            indexPage.AppendLine("""
                <script>
                    setPageTitle("Specification");
                    app.navPage = "spec";
                </script>
                <include name="component/header"></include>
                <div id="appContainer">
                    <section class="doc-container">
                        <article class="section-content pad">
                            <h1>
                                Specification
                            </h1>
                            <p>
                                You are viewing the Sisk API specification. Navigate from the sidebar to get started.
                            </p>
                        </article>
                        <include name="/spec/__Component"></include>
                    </section>
                </div>
                """);
            foreach (StType type in typeList.OrderBy(t => t.FullName).ToArray())
            {
                componentBuilder.AppendLine($"""
                    <a href="/spec/{type.FullName}">
                        {type.ShortName}
                    </a>
                    """);

                string fileName = type.FullName + ".html";
                StringBuilder typeFile = new StringBuilder();
                typeFile.AppendLine($"""
                    <script>
                        setPageTitle("{type.ShortName} {type.Type.ToLower()}");
                        app.navPage = "spec";
                    </script>
                    <include name="component/header"></include>
                    <div id="appContainer">
                        <section class="doc-container">
                            <article class="section-content pad">
                                <h1>
                                    {type.ShortName} {type.Type.ToLower()}
                                </h1>
                    """);
                if (!string.IsNullOrEmpty(type.Assembly))
                {
                    typeFile.AppendLine($"""
                        <p>
                            Assembly: {type.Assembly}
                        </p>
                        """);
                }
                if (!string.IsNullOrEmpty(type.Definition))
                {
                    typeFile.AppendLine($"""
                        <p>
                            Definition:
                        </p>
                        <pre><code class="language-cs">{type.Definition}</code></pre>
                        """);
                }
                if (!string.IsNullOrEmpty(type.Summary))
                {
                    typeFile.AppendLine($"""
                        <p>
                            {type.Summary}
                        </p>
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
                        <h2 id="{roleId}">
                            {role} list
                        </h2>
                        <table>
                            <tbody>
                        """);

                    foreach (StMember member in roleMembers)
                    {
                        typeFile.AppendLine($"""
                                <tr>
                                    <td>
                                        <a href="/spec/{member.Filename}">
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

                typeFile.AppendLine($"""
                                        </article>
                            <include name="/spec/__Component"></include>
                        </section>
                    </div>
                    """);

                string html = typeFile.ToString();
                File.WriteAllText("Output/" + fileName, html);
            }

            // members files
            foreach (StType type in typeList)
            {
                foreach (StMember member in type.Members)
                {

                    StringBuilder html = new StringBuilder();
                    html.AppendLine($"""
                            <script>
                                setPageTitle("{type.ShortName} {type.Type.ToLower()}");
                                app.navPage = "spec";
                            </script>
                            <include name="component/header"></include>
                            <div id="appContainer">
                                <section class="doc-container">
                                    <article class="section-content pad">
                                        <h1>
                                            {member.DeclaringName} {member.Role.ToLower()}
                                        </h1>
                                        <p>
                                            Declaring type:
                                            <a href="/spec/{member.ParentType}">
                                                {member.ParentType}
                                            </a>
                                            (from {type.Assembly})
                                        </p>
                            """);
                    if (!string.IsNullOrEmpty(member.Definition))
                    {
                        html.AppendLine($"""
                            <p>
                                Definition:
                            </p>
                            <pre><code class="language-cs">{member.Definition}</code></pre>
                            """);
                    }
                    if (!string.IsNullOrEmpty(member.Summary))
                    {
                        html.AppendLine($"""
                            <p>
                                {member.Summary}
                            </p>
                            """);
                    }
                    if (!string.IsNullOrEmpty(member.Remarks))
                    {
                        html.AppendLine($"""
                            <blockquote>
                                {member.Remarks}
                            </blockquote>
                            """);
                    }
                    if (member.Parameters.Count > 0)
                    {
                        html.AppendLine($"""
                            <h2>
                                Parameters
                            </h2>
                            <table>
                                <tbody>
                            """);
                        foreach (StParam param in member.Parameters)
                        {
                            html.AppendLine($"""
                                <tr>
                                    <td>{param.Name}</td>
                                    <td>{param.Summary}</td>
                                </tr>
                                """);
                        }
                        html.AppendLine($"""
                            </tbody>
                        </table>
                        """);
                    }
                    html.AppendLine($"""
                                        </article>
                            <include name="/spec/__Component"></include>
                        </section>
                    </div>
                    """);

                    string rawHtml = html.ToString();
                    File.WriteAllText("Output/" + member.Filename + ".html", rawHtml);
                }
            }

            componentBuilder.AppendLine("""</div>""");
            File.WriteAllText("Output/__Component.html", componentBuilder.ToString());
            File.WriteAllText("Output/index.html", indexPage.ToString());
        }
    }
}