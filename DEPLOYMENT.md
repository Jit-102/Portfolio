# Deployment Guide - Jit Goria Portfolio

## Quick Deploy to Railway (Free)

### Step 1: Prepare Your Repository
1. Make sure all your code is committed to Git
2. Push to GitHub if not already there

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose this repository
6. Railway will automatically detect it's a Node.js app
7. **Important**: Name your project "jit-goria-portfolio" for a personalized URL

### Step 3: Add Database
1. In your Railway project dashboard, click "New Service"
2. Select "Database" → "PostgreSQL"
3. Railway will create a free PostgreSQL database
4. Copy the DATABASE_URL from the database service

### Step 4: Set Environment Variables
In your Railway app service, go to Variables tab and add:
```
DATABASE_URL=<paste the database URL from step 3>
NODE_ENV=production
SESSION_SECRET=JitGoriaPortfolio2024SecretKey
PORT=5000
```

### Step 5: Deploy
1. Railway will automatically build and deploy your app
2. You'll get a free `.railway.app` domain
3. Your app will be live in a few minutes!

## Alternative: One-Click Deploy
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template)

## Free Tier Limits
- 500 execution hours per month
- $5 credit monthly (usually enough for small apps)
- Free PostgreSQL database
- Custom domain support

## Post-Deployment
1. Run database migrations: `npm run db:push`
2. Test all functionality
3. Set up monitoring (optional)

Your professional dashboard will be live at: `https://jit-goria-portfolio.railway.app`