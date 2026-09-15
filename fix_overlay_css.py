import re

with open("src/app/globals.css", "r") as f:
    content = f.read()

# Fix mobile-overlay
old_overlay = r'\.mobile-overlay \{ touch-action: none;\n  position: fixed; inset: 0; background: var\(--background\); z-index: 1500;\n  display: flex; flex-direction: column; justify-content: center; align-items: center;\n\}'
new_overlay = """.mobile-overlay { 
  position: fixed; inset: 0; background: var(--background); z-index: 1500;
  display: flex; flex-direction: column; align-items: center; 
  padding-top: 100px; padding-bottom: 80px; overflow-y: auto;
}"""

content = re.sub(old_overlay, new_overlay, content)

# Fix mobile-nav-links gap so they fit better on screen
old_links = r'\.mobile-nav-links \{ display: flex; flex-direction: column; gap: 32px; text-align: center; \}'
new_links = ".mobile-nav-links { display: flex; flex-direction: column; gap: 24px; text-align: center; margin: auto 0; }"

content = re.sub(old_links, new_links, content)

with open("src/app/globals.css", "w") as f:
    f.write(content)
