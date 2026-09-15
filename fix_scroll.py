import re

with open("src/components/SharedUI.tsx", "r") as f:
    content = f.read()

old_use_effect = r'  useEffect\(\(\) => \{\n    const timer = setTimeout\(\(\) => setIsLoading\(false\), 1200\);\n    return \(\) => clearTimeout\(timer\);\n  \}, \[\]\);'
new_use_effect = """  useEffect(() => {
    if (typeof window !== "undefined" && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);"""

content = re.sub(old_use_effect, new_use_effect, content)

with open("src/components/SharedUI.tsx", "w") as f:
    f.write(content)
