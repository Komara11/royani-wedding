import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const segments = (await params).path;
  if (!segments || segments.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Sanitize: prevent directory traversal
  const cleaned = segments.map(s => s.replace(/\.\./g, "")).join("/");

  // Try multiple locations
  const possiblePaths = [
    path.join(process.cwd(), "public", "uploads", cleaned),
    path.join("/var/www/royani-wedding/public/uploads", cleaned),
    path.join("/var/www/royani-admin/public/uploads", cleaned),
    path.join("/var/www/uploads", cleaned),
  ];

  for (const filePath of possiblePaths) {
    try {
      const fileStat = await stat(filePath);
      if (!fileStat.isFile()) continue;

      const buffer = await readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "Content-Length": buffer.length.toString(),
        },
      });
    } catch {
      // Try next path
      continue;
    }
  }

  return NextResponse.json({ error: "File not found" }, { status: 404 });
}
