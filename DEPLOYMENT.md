# Deployment Guide - Jit Goria Portfolio

## 🚀 Multiple Free Hosting Options

Since Railway is having SIGTERM issues, here are alternative free hosting platforms:

## Option 1: Render (Recommended)

### Step 1: Deploy to Render
1. **Go to [render.com](https://render.com)**
2. **Sign up with GitHub**
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repo**: `Jit-102/Portfolio`
5. **Configure**:
   - **Name**: `jit-goria-portfolio`
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 2: Add Environment Variables
```
DATABASE_URL=<will be provided by Render PostgreSQL>
NODE_ENV=production
SESSION_SECRET=JitGoriaPortfolio2024SecretKey
PORT=10000
```

### Step 3: Add Database (Optional)
1. **Create PostgreSQL database** in Render
2. **Copy DATABASE_URL** to your web service

**Your portfolio will be live at**: `https://jit-goria-portfolio.onrender.com`

---

## Option 2: Vercel (Frontend + Serverless)

### Step 1: Deploy to Vercel
1. **Go to [vercel.com](https://vercel.com)**
2. **Import your GitHub repo**: `Jit-102/Portfolio`
3. **Vercel auto-detects** and deploys

**Your portfolio will be live at**: `https://jit-goria-portfolio.vercel.app`

---

## Option 3: Netlify (Static + Functions)

### Step 1: Deploy to Netlify
1. **Go to [netlify.com](https://netlify.com)**
2. **New site from Git** → Select your repo
3. **Build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`

**Your portfolio will be live at**: `https://jit-goria-portfolio.netlify.app`

---

## 🎯 Recommendation

**Try Render first** - it's most similar to Railway but more stable for Node.js apps.

All platforms offer:
- ✅ Free hosting
- ✅ Automatic deployments from GitHub
- ✅ Custom domains
- ✅ HTTPS included