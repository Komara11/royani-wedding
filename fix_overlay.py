import re

with open("src/components/SharedUI.tsx", "r") as f:
    content = f.read()

# We need to change:
# return (
#   <nav ...>
#      ...
#      <AnimatePresence>...</AnimatePresence>
#   </nav>
# )
# To:
# return (
#   <>
#     <nav ...>...</nav>
#     <AnimatePresence>...</AnimatePresence>
#   </>
# )

old_return = r'  return \(\n    <nav className=\{`\$\{navScrolled \? "scrolled" : ""\} \$\{hamburgerActive \? "menu-open" : ""\}`\.trim\(\)\}>\n      <div className="nav-container">(.*?)      </div>\n\n      \{/\* Mobile Fullscreen Overlay \*/\}\n      <AnimatePresence>\n(.*?)      </AnimatePresence>\n    </nav>\n  \);'

def repl(m):
    nav_inner = m.group(1)
    overlay = m.group(2)
    return f"""  return (
    <>
      <nav className={{`${{navScrolled ? "scrolled" : ""}} ${{hamburgerActive ? "menu-open" : ""}}`.trim()}} style={{ zIndex: hamburgerActive ? 2000 : 1000 }}>
        <div className="nav-container">{nav_inner}      </div>
      </nav>

      {{/* Mobile Fullscreen Overlay */}}
      <AnimatePresence>
{overlay}      </AnimatePresence>
    </>
  );"""

new_content = re.sub(old_return, repl, content, flags=re.DOTALL)

with open("src/components/SharedUI.tsx", "w") as f:
    f.write(new_content)
