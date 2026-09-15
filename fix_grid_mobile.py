import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Replace <div className="pricing-grid"> with swipe indicator and pricing-preview-grid
old_grid = r'<div className="pricing-grid">'
new_grid = """<div className="swipe-indicator">← Geser untuk melihat paket →</div>
              <div className="pricing-preview-grid">"""

content = re.sub(old_grid, new_grid, content)

with open("src/app/page.tsx", "w") as f:
    f.write(content)
