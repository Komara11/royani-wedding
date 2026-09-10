import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Add lazy loading to images
content = content.replace(
    '<img src={aboutContent.image_url || "/images/about.jpg"} alt="Royani Wedding" onError={(e) => { e.currentTarget.src = "/images/about.jpg"; }} />',
    '<img src={aboutContent.image_url || "/images/about.jpg"} alt="Royani Wedding" loading="lazy" decoding="async" onError={(e) => { e.currentTarget.src = "/images/about.jpg"; }} />'
)

# Fix hero image
content = content.replace(
    '<img src={heroContent.bg_image_url || (heroContent as any).image_url || "/images/bg-hero.jpg"} alt="Royani Wedding" onError={(e) => { e.currentTarget.src = "/images/bg-hero.jpg"; }} />',
    '<img src={heroContent.bg_image_url || (heroContent as any).image_url || "/images/bg-hero.jpg"} alt="Royani Wedding" loading="eager" fetchpriority="high" decoding="async" onError={(e) => { e.currentTarget.src = "/images/bg-hero.jpg"; }} />'
)

with open("src/app/page.tsx", "w") as f:
    f.write(content)
