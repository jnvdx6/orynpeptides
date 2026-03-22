# Paperclip AI - Server Migration & Business Expansion Guide

## Server Deployment Summary

| Item | Value |
|------|-------|
| **URL** | https://paperclip.skyodoo.com |
| **Server** | omegaserver02 (Linux Ubuntu 22.04) |
| **Source Code** | `/home/omegaserver02/paperclip` (git clone) |
| **Data Directory** | `/home/omegaserver02/.paperclip/instances/default/` |
| **Database** | PostgreSQL 14 (`paperclip` db, user `paperclip`) |
| **DB Password** | `PaperclipOryn2026!` |
| **PM2 Process** | `paperclip` (id 11) |
| **Internal Port** | 3101 (Paperclip server) |
| **Nginx Proxy** | 127.0.0.1:8880 → 127.0.0.1:3101 |
| **Cloudflare Tunnel** | `skyodoo-prod` (f8b84d5f) |
| **Node Version** | v20.20.1 (via nvm) |
| **Chromium** | `/snap/bin/chromium` (headless) |

---

## 1. Architecture Overview

```
Internet → Cloudflare Tunnel → Nginx (:8880) → Paperclip (:3101)
                                                    │
                                                    ├── PostgreSQL (:5432)
                                                    ├── Claude Code CLI
                                                    ├── Headless Chromium
                                                    └── ~/.paperclip/ (data)
```

### Directory Structure
```
/home/omegaserver02/
├── paperclip/                          # Source code (git clone)
│   ├── server/                         # Backend (Express + TypeScript)
│   ├── ui/                             # Frontend (React + Vite)
│   ├── packages/
│   │   ├── db/                         # Database schemas & migrations
│   │   ├── adapters/                   # Agent adapters (Claude, Codex, etc.)
│   │   ├── adapter-utils/              # Shared adapter utilities
│   │   ├── plugins/                    # Plugin system
│   │   └── shared/                     # Shared types & utilities
│   └── ecosystem.config.cjs           # PM2 configuration
│
└── .paperclip/instances/default/       # Runtime data
    ├── config.json                     # Instance configuration
    ├── .env                            # Environment variables
    ├── secrets/master.key              # Encryption key (CRITICAL - backup!)
    ├── data/
    │   ├── storage/                    # Uploaded files
    │   ├── backups/                    # Hourly DB backups (30-day retention)
    │   └── run-logs/                   # Agent execution logs
    ├── workspaces/                     # Agent workspaces
    └── logs/                           # Server & PM2 logs
```

---

## 2. Daily Operations

### Start/Stop/Restart
```bash
ssh omegaserver02@omegaserver02
source ~/.nvm/nvm.sh && nvm use 20

pm2 restart paperclip     # Restart
pm2 stop paperclip        # Stop
pm2 start paperclip       # Start
pm2 logs paperclip        # Live logs
pm2 logs paperclip --lines 100 --nostream  # Last 100 lines
```

### Check Status
```bash
pm2 list                  # All processes
curl http://127.0.0.1:3101/  # Health check (200 = OK)
```

### Database Access
```bash
PGPASSWORD='PaperclipOryn2026!' psql -h 127.0.0.1 -U paperclip -d paperclip

# Useful queries:
SELECT count(*) FROM companies;
SELECT count(*) FROM agents;
SELECT count(*) FROM issues;
SELECT name, status FROM agents;
```

### Manual Backup
```bash
PGPASSWORD='PaperclipOryn2026!' pg_dump -h 127.0.0.1 -U paperclip paperclip > ~/paperclip-backup-$(date +%Y%m%d).sql
```

---

## 3. Updating Paperclip

Since you have the source code cloned, you can pull updates:

```bash
cd ~/paperclip
git pull origin main
source ~/.nvm/nvm.sh && nvm use 20
pnpm install
pnpm build
pm2 restart paperclip
```

### After Major Updates (with migrations)
```bash
cd ~/paperclip
git pull origin main
pnpm install
pnpm build
# Migrations run automatically on startup
pm2 restart paperclip
pm2 logs paperclip --lines 30 --nostream  # Verify migrations applied
```

---

## 4. Customizing Paperclip (Source Code Modifications)

### Key Source Files for Customization

| What to customize | File location |
|---|---|
| **Server startup & config** | `server/src/index.ts` |
| **API routes** | `server/src/routes/` |
| **Database schema** | `packages/db/src/schema/` |
| **Agent adapters** | `packages/adapters/` |
| **Claude adapter** | `packages/adapters/claude-local/` |
| **UI components** | `ui/src/` |
| **UI pages** | `ui/src/pages/` |
| **Plugin system** | `packages/plugins/` |

### Adding a Custom Agent Adapter

1. Create a new adapter in `packages/adapters/`:
```bash
cp -r packages/adapters/claude-local packages/adapters/my-custom-adapter
```

2. Modify `packages/adapters/my-custom-adapter/src/server/execute.ts` to implement your agent logic.

3. Register it in the server configuration.

4. Rebuild:
```bash
pnpm build
pm2 restart paperclip
```

### Creating Database Migrations

```bash
cd ~/paperclip
# After modifying schema files in packages/db/src/schema/
pnpm db:generate    # Generate migration SQL
pnpm db:migrate     # Apply migration
```

### Custom UI Modifications

```bash
cd ~/paperclip/ui
# Edit components in src/
# The UI uses React + Vite + Tailwind
pnpm build          # Rebuild UI
pm2 restart paperclip
```

---

## 5. Headless Browser Access (Chrome/Chromium)

### Current Setup
- **Chromium**: `/snap/bin/chromium` (v146)
- **Puppeteer**: Installed globally via npm
- **Mode**: Headless (no display server needed)

### Using Headless Chrome in Agents
The server is configured with:
```
PUPPETEER_EXECUTABLE_PATH=/snap/bin/chromium
CHROME_PATH=/snap/bin/chromium
```

### Remote Browser Debugging (for visual inspection)

If you need to see what the browser is doing remotely:

```bash
# Start Chrome with remote debugging
/snap/bin/chromium --headless --no-sandbox --remote-debugging-port=9222 --remote-debugging-address=0.0.0.0 &

# Then forward the port via SSH from your Mac:
ssh -L 9222:127.0.0.1:9222 omegaserver02@omegaserver02

# Open chrome://inspect in your local Chrome browser
```

### Option B: noVNC (Full GUI in browser)

For a full visual browser accessible from your web browser:

```bash
# Install noVNC + virtual framebuffer
sudo apt install -y xvfb x11vnc novnc websockify

# Start virtual display
Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99

# Start VNC server
x11vnc -display :99 -nopw -forever &

# Start noVNC web interface
websockify --web=/usr/share/novnc/ 6080 localhost:5900 &

# Now access http://omegaserver02:6080/vnc.html from your browser
# And launch Chromium:
DISPLAY=:99 /snap/bin/chromium --no-sandbox &
```

### Option C: Playwright (Recommended for automation)

```bash
npm install -g playwright
npx playwright install chromium
```

Then in your custom agents:
```typescript
import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('https://example.com');
// Screenshot, scrape, interact...
await browser.close();
```

---

## 6. Business Expansion Ideas

### 6.1 Multi-Company Setup
Paperclip supports multiple companies with complete data isolation. Use the UI to create new companies for different business units or clients.

### 6.2 Custom Plugins
Paperclip has a plugin system. Create plugins in `packages/plugins/`:

```bash
cd ~/paperclip
# Use the plugin creation tool
npx create-paperclip-plugin my-business-plugin
```

Plugins can:
- Add custom UI panels
- Register new tools for agents
- Handle webhooks
- Run scheduled jobs
- Integrate with external services

### 6.3 Integrate with Your Existing Services

Since Paperclip is on the same server as your other services:

| Service | Internal URL | Use case |
|---------|-------------|----------|
| Medusa (ORYN) | http://127.0.0.1:9000 | E-commerce automation |
| Odoo | http://127.0.0.1:8069 | ERP/CRM integration |
| Grafana | http://127.0.0.1:3000 | Monitoring dashboards |

Create agents that interact with these services via their APIs.

### 6.4 API Keys for Agents

Add API keys for your agents via the Paperclip UI or environment:

```bash
# Add to ecosystem.config.cjs env block:
ANTHROPIC_API_KEY: "sk-ant-...",
OPENAI_API_KEY: "sk-...",
```

Then restart: `pm2 restart paperclip`

### 6.5 S3 Storage (for scale)

Switch from local disk to S3 in `config.json`:
```json
{
  "storage": {
    "provider": "s3",
    "s3": {
      "bucket": "your-bucket",
      "region": "eu-west-1",
      "prefix": "paperclip/",
      "forcePathStyle": false
    }
  }
}
```

### 6.6 Scheduled Agent Work

Agents in Paperclip work on a heartbeat system. Configure schedules in the UI:
- **Cron-based**: Run agents at specific times
- **Event-based**: Trigger on task assignments, mentions
- **Continuous**: Agents check for work every N minutes

---

## 7. Security Considerations

### Critical Files to Backup
1. `~/.paperclip/instances/default/secrets/master.key` - Encryption key
2. Database backups (auto-created hourly in `data/backups/`)
3. `ecosystem.config.cjs` - PM2 config with secrets

### Access Control
- Paperclip runs in `authenticated` mode - login required
- Sign-up is currently enabled (`disableSignUp: false`)
- To disable public sign-up, set `"disableSignUp": true` in config.json

### Firewall
Port 3101 is bound to `0.0.0.0` but should only be accessible internally (Cloudflare Tunnel handles external access). Consider:
```bash
sudo ufw allow from 127.0.0.1 to any port 3101
sudo ufw deny 3101
```

---

## 8. Troubleshooting

### Server won't start
```bash
pm2 logs paperclip --lines 50 --nostream   # Check last errors
pm2 restart paperclip --update-env          # Restart with fresh env
```

### Database connection issues
```bash
# Test connection
PGPASSWORD='PaperclipOryn2026!' psql -h 127.0.0.1 -U paperclip -d paperclip -c 'SELECT 1;'

# Check PostgreSQL is running
sudo systemctl status postgresql
```

### Agent workspace errors (macOS paths)
If agents reference `/Users/jonlaraudogoitia/...` paths, update workspace paths in the Paperclip UI to Linux paths (e.g., `/home/omegaserver02/workspaces/`).

### Nginx issues
```bash
sudo nginx -t                    # Test config
sudo systemctl reload nginx      # Reload
sudo tail -20 /var/log/nginx/error.log  # Check errors
```

### Cloudflare Tunnel
```bash
sudo systemctl status cloudflared     # Check tunnel status
sudo systemctl restart cloudflared    # Restart tunnel
cloudflared tunnel list               # List tunnels
```

---

## 9. Migrated Data Summary

| Data | Status |
|------|--------|
| Database (1 company, 13 agents, 153 issues, 1 user) | Restored |
| Master encryption key | Transferred |
| Run logs (522MB) | Transferred |
| Agent workspaces | Empty (need reconfiguration for Linux paths) |
| Configuration | Adapted for server deployment |
| Cloudflare Tunnel | Configured (paperclip.skyodoo.com) |

---

## 10. Quick Reference Commands

```bash
# SSH into server
SSHPASS='Pi314159zerodai' sshpass -e ssh omegaserver02@omegaserver02

# Once on server, always run:
source ~/.nvm/nvm.sh && nvm use 20

# Paperclip management
pm2 restart paperclip
pm2 logs paperclip
pm2 stop paperclip

# Update Paperclip
cd ~/paperclip && git pull && pnpm install && pnpm build && pm2 restart paperclip

# Database
PGPASSWORD='PaperclipOryn2026!' psql -h 127.0.0.1 -U paperclip -d paperclip

# Backup
PGPASSWORD='PaperclipOryn2026!' pg_dump -h 127.0.0.1 -U paperclip paperclip > ~/backup-$(date +%Y%m%d).sql
```
