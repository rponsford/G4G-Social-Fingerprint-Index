import re, json, sys
src, out = sys.argv[1], sys.argv[2]
host = sys.argv[3] if len(sys.argv) > 3 else 'givinglens'
name = sys.argv[4] if len(sys.argv) > 4 else 'GivingLens'
folder = sys.argv[5] if len(sys.argv) > 5 else 'givinglens'
s = open(src).read()
style = re.search(r'<style>(.*?)</style>', s, re.S).group(1)
script = re.search(r'<script>(.*)</script>', s, re.S).group(1)
markup = re.search(r'</style>(.*?)<script>', s, re.S).group(1).strip()
style = style.replace(':root {', ':host {\n  display: block;', 1).replace('\nbody {', '\n.gl-body {', 1)
style = re.sub(r'/\*.*?\*/\n?', '', style, flags=re.S)
style = re.sub(r'\n(header\.top|\.book|\.proto)[^\n]*', '', style)
markup = re.sub(r'\s*<!--.*?-->', '', markup)
for a, b in [('document.getElementById(', 'ROOT.getElementById('), ('document.querySelectorAll(', 'ROOT.querySelectorAll('), ('document.querySelector(', 'ROOT.querySelector(')]:
    script = script.replace(a, b)
html = '<style>' + style.strip() + '</style><div class="gl-body">' + markup + '</div>'
js = ('/* ' + name + ' by Gateway for Good. Embed on any page with:\n'
      ' *   <div id="' + host + '"></div>\n'
      ' *   <script src="https://tools.gatewayforgood.com/' + folder + '/' + host + '.js" defer></script>\n'
      ' * Edit the source in ' + host + '.src.html, not this file. */\n'
      '(function(){\n'
      'var HOST = document.getElementById("' + host + '");\n'
      'if (!HOST || HOST.shadowRoot) return;\n'
      'var ROOT = HOST.attachShadow({ mode: "open" });\n'
      'ROOT.innerHTML = ' + json.dumps(html, ensure_ascii=False) + ';\n'
      + script.strip() + '\n})();\n')
open(out, 'w').write(js); print(len(js))
