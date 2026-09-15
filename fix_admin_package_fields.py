import re

with open("../royani-admin/src/app/dashboard/packages/page.tsx", "r") as f:
    content = f.read()

# Replace all occurrences of sort_order with sortOrder
content = content.replace("sort_order:", "sortOrder:")
content = content.replace("sort_order}", "sortOrder}")
content = content.replace("sort_order ", "sortOrder ")
content = content.replace("sort_order,", "sortOrder,")
content = content.replace("item.sort_order", "item.sortOrder")
content = content.replace("editItem.sort_order", "editItem.sortOrder")

# Replace all occurrences of is_active with isActive
content = content.replace("is_active:", "isActive:")
content = content.replace("is_active}", "isActive}")
content = content.replace("is_active,", "isActive,")
content = content.replace("item.is_active", "item.isActive")
content = content.replace("editItem.is_active", "editItem.isActive")

with open("../royani-admin/src/app/dashboard/packages/page.tsx", "w") as f:
    f.write(content)
