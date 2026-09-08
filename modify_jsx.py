import re
import sys

def modify_file(filepath, sections_to_keep):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the start of the return statement
    return_idx = content.find('  return (\n    <>')
    if return_idx == -1:
        print(f"Could not find return statement in {filepath}")
        return

    pre_return = content[:return_idx + 18] # includes '  return (\n    <>\n'
    post_return = content[return_idx + 18:]

    # Let's map sections to regexes
    sections = {
        'PRELOADER': r'\{/\* PRELOADER \*/\}.*?(?=\{/\* BACKGROUND|\{/\* NAVIGATION)',
        'PARTICLES': r'\{/\* BACKGROUND FLOATING PARTICLES \*/\}.*?(?=\{/\* NAVIGATION)',
        'NAVBAR': r'\{/\* NAVIGATION BAR \*/\}.*?(?=\{/\* HERO)',
        'HERO': r'\{/\* HERO SECTION .*?\*/\}.*?(?=\{/\* SECTION DIVIDER)',
        'ABOUT': r'\{/\* ABOUT SECTION .*?\*/\}.*?(?=\{/\* PARALLAX QUOTE)',
        'PARALLAX': r'\{/\* PARALLAX QUOTE DIVIDER \*/\}.*?(?=\{/\* SECTION DIVIDER)',
        'PORTFOLIO': r'\{/\* PORTFOLIO SECTION .*?\*/\}.*?(?=\{/\* PORTFOLIO LIGHTBOX)',
        'PORTFOLIO_MODAL': r'\{/\* PORTFOLIO LIGHTBOX MODAL \*/\}.*?(?=\{/\* SECTION DIVIDER)',
        'PRICING': r'\{/\* PRICING SECTION .*?\*/\}.*?(?=\{/\* BOOKING MODAL)',
        'BOOKING_MODAL': r'\{/\* BOOKING MODAL \*/\}.*?(?=\{/\* SECTION DIVIDER)',
        'FAQ': r'\{/\* FAQ SECTION .*?\*/\}.*?(?=\{/\* SECTION DIVIDER)',
        'SOCIAL': r'\{/\* SOSIAL MEDIA \*/\}.*?(?=\{/\* SECTION DIVIDER)',
        'CONTACT': r'\{/\* CONTACT & DETAILED QUERY FORM .*?\*/\}.*?(?=\{/\* FLOATING WHATSAPP)',
        'WHATSAPP': r'\{/\* FLOATING WHATSAPP BUTTON \*/\}.*?(?=\{/\* FOOTER)',
        'FOOTER': r'\{/\* FOOTER \*/\}.*?(?=</>)'
    }

    new_post_return = post_return
    
    sections_to_remove = [k for k in sections.keys() if k not in sections_to_keep]
    sections_to_remove += ['PRELOADER', 'NAVBAR', 'WHATSAPP', 'FOOTER'] 
    
    for sec in sections_to_remove:
        pattern = sections.get(sec)
        if pattern:
            new_post_return = re.sub(pattern, '', new_post_return, flags=re.DOTALL)
    
    new_post_return = re.sub(r'\{/\* SECTION DIVIDER ♦ \*/\}\s*<div className="gold-divider">\s*<span>♦</span>\s*</div>', '', new_post_return, flags=re.DOTALL)
    new_post_return = re.sub(sections['PARTICLES'], '', new_post_return, flags=re.DOTALL)
    
    # Write back
    with open(filepath, 'w') as f:
        f.write(pre_return + new_post_return)
        
    print(f"Modified {filepath}")

files = {
    'src/app/page.tsx': ['HERO', 'ABOUT', 'PARALLAX', 'FAQ', 'SOCIAL', 'CONTACT'],
    'src/app/harga/page.tsx': ['PRICING', 'BOOKING_MODAL']
}

for filepath, keep in files.items():
    modify_file(filepath, keep)
