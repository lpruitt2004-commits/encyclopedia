# Encyclopedia PWA - Digital Ocean Deployment Guide

## Server Information

- IP Address: `157.230.145.57`
- Deployment Path: `/var/www/encyclopedia`

## Prerequisites

### 1. SSH Access

Make sure you can SSH into your server:

```bash
ssh root@157.230.145.57
```

### 2. Server Setup (Run on Digital Ocean server)

#### Install Nginx

```bash
sudo apt update
sudo apt install nginx -y
```

#### Start and enable Nginx

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### Configure firewall (if UFW is enabled)

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

## Deployment Methods

### Method 1: Automated Deployment (Recommended)

1. Make the deployment script executable:

```bash
chmod +x deploy.sh
```

2. Run the deployment script:

```bash
./deploy.sh
```

### Method 2: Manual Deployment

1. Build the project locally:

```bash
npm run build
```

2. Copy files to server:

```bash
scp -r dist/* root@157.230.145.57:/var/www/encyclopedia/
```

3. Set permissions on server:

```bash
ssh root@157.230.145.57 "chown -R www-data:www-data /var/www/encyclopedia && chmod -R 755 /var/www/encyclopedia"
```

## Nginx Configuration

1. Copy the nginx configuration to your server:

```bash
scp nginx.conf root@157.230.145.57:/etc/nginx/sites-available/encyclopedia
```

2. SSH into your server and create symbolic link:

```bash
ssh root@157.230.145.57
sudo ln -s /etc/nginx/sites-available/encyclopedia /etc/nginx/sites-enabled/
```

3. Remove default nginx site (optional):

```bash
sudo rm /etc/nginx/sites-enabled/default
```

4. Test nginx configuration:

```bash
sudo nginx -t
```

5. Reload nginx:

```bash
sudo systemctl reload nginx
```

## Access Your Application

Your encyclopedia PWA should now be accessible at:

- **HTTP**: http://157.230.145.57

## Optional: Setup SSL/HTTPS with Let's Encrypt

1. Install Certbot:

```bash
ssh root@157.230.145.57
sudo apt install certbot python3-certbot-nginx -y
```

2. Get SSL certificate (requires a domain name):

```bash
sudo certbot --nginx -d yourdomain.com
```

## Updating Your Application

After making changes to your code:

1. Commit and push changes to GitHub:

```bash
git add .
git commit -m "Update description"
git push
```

2. Deploy updated version:

```bash
./deploy.sh
```

## Troubleshooting

### Check Nginx status

```bash
ssh root@157.230.145.57 "sudo systemctl status nginx"
```

### View Nginx error logs

```bash
ssh root@157.230.145.57 "sudo tail -f /var/log/nginx/error.log"
```

### Check file permissions

```bash
ssh root@157.230.145.57 "ls -la /var/www/encyclopedia"
```

### Restart Nginx

```bash
ssh root@157.230.145.57 "sudo systemctl restart nginx"
```

## Server Maintenance

### Update server packages

```bash
ssh root@157.230.145.57
sudo apt update && sudo apt upgrade -y
```

### Monitor server resources

```bash
ssh root@157.230.145.57 "htop"
```

## Notes

- The deployment script uses `rsync` for efficient file transfers
- Static assets are cached for 1 year for optimal performance
- Service worker is not cached to ensure PWA updates work correctly
- Gzip compression is enabled for all text-based files
- Security headers are configured for production use

## Quick Deploy Command

For future deployments, just run:

```bash
./deploy.sh
```
