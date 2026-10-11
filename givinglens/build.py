import re, json, sys
src, out = sys.argv[1], sys.argv[2]
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
js = ('/* GivingLens by Gateway for Good. Embed on any page with:\n'
      ' *   <div id="givinglens"></div>\n'
      ' *   <script src="https://rponsford.github.io/G4G-Social-Fingerprint-Index/givinglens/givinglens.js" defer></script>\n'
      ' * Edit the source in givinglens.src.html, not this file. */\n'
      '(function(){\n'
      'var HOST = document.getElementById("givinglens");\n'
      'if (!HOST || HOST.shadowRoot) return;\n'
      'var ROOT = HOST.attachShadow({ mode: "open" });\n'
      'ROOT.innerHTML = ' + json.dumps(html, ensure_ascii=False) + ';\n'
      + script.strip() + '\n})();\n')
open(out, 'w').write(js); print(len(js))
