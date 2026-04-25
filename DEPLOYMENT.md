# DIGISTUDIO Deployment Guide

## Current Status
✅ Site: Live at `https://purple-ghosts-train.loca.lt` (dev mode via localtunnel)
✅ Build: Production-ready `.next` folder created
✅ Config: Nginx and systemd files ready
✅ Products: 3 real products added
✅ Content: Testimonials and homepage text updated

## Production Deployment (One Command)
```bash
cd /root/.openclaw/workspace/digistudio-site
./deploy.sh
```

## Manual Deployment
1. Build:
```bash
npm run build
```

2. Start as systemd service:
```bash
sudo cp digistudio.service /etc/systemd/system/digistudio.service
sudo systemctl daemon-reload
sudo systemctl enable digistudio
sudo systemctl start digistudio
```

3. Access:
- Local: `http://localhost:3001`
- External: `http://145.223.117.153:3001`

## Nginx (if needed)
The `nginx-digistudio-site.conf` is configured to forward:
- Port 80 → 3001
- API requests → `/api`
- Static files → cache-friendly

## Maintenance
- Stop: `sudo systemctl stop digistudio`
- Restart: `sudo systemctl restart digistudio`
- Logs: `sudo journalctl -u digistudio -f`
- Status: `sudo systemctl status digistudio`

## Backup
```bash
pg_dump -U postgres -d postgresql > backup_$(date +%Y%m%d).sql
```

---

**Created:** 2026-04-24  
**Status:** Production-ready  
**Git commit:** `ec2e367`
