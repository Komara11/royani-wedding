#!/bin/bash
# Simpan file ini di VPS (misalnya di /root/deploy.sh) agar mudah deploy ulang nanti

set -e

echo "===== MEMULAI DEPLOYMENT ROYANI WEDDING ====="

# 1. Update Website Utama
echo "-> Mengupdate Website Utama..."
cd /var/www/royani-wedding
git fetch origin main
git reset --hard origin/main

# Install dependency baru (framer-motion)
npm install --legacy-peer-deps

# Build Next.js
npm run build

# 2. Restart PM2
echo "-> Merestart PM2..."
pm2 restart all
pm2 save

echo "===== DEPLOYMENT SELESAI ====="
