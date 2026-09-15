import re

with open("src/app/globals.css", "r") as f:
    content = f.read()

# Restore horizontal scroll specifically for preview grids, remove from main .pricing-grid
content = content.replace(
    ".services-grid, .pricing-preview-grid, .pricing-grid { display: flex;",
    ".services-grid, .pricing-preview-grid { display: flex;"
)
content = content.replace(
    ".services-grid::-webkit-scrollbar, .pricing-preview-grid::-webkit-scrollbar, .pricing-grid::-webkit-scrollbar { display: none; }",
    ".services-grid::-webkit-scrollbar, .pricing-preview-grid::-webkit-scrollbar { display: none; }"
)

# Constrain width ONLY for horizontal scroll items
content = content.replace(
    ".service-card, .pricing-card { width: 85vw; max-width: 300px; scroll-snap-align: center; flex-shrink: 0; }",
    ".services-grid .service-card, .pricing-preview-grid .pricing-card { width: 85vw; max-width: 300px; scroll-snap-align: center; flex-shrink: 0; }\n  .pricing-card { padding: 32px 20px; width: 100%; max-width: none; }"
)

with open("src/app/globals.css", "w") as f:
    f.write(content)
