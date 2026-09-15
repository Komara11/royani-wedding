with open("../royani-admin/src/app/dashboard/packages/page.tsx", "r") as f:
    content = f.read()

# Replace <div className="modal-footer"> with </div>\n<div className="modal-footer">
# Wait, let's just make sure we only do it for the FIRST one which is in the edit modal, not the delete modal.
# Oh, both have modal-footer? Let's check.
