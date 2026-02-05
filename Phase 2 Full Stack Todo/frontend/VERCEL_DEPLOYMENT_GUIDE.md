# Vercel Deployment Guide

This guide explains how to deploy the Next.js frontend application on Vercel.

## Prerequisites

- Node.js installed
- Vercel CLI installed: `npm install -g vercel`
- Access to the Vercel dashboard (sign up at https://vercel.com if needed)

## Deployment Steps

### 1. Prepare the Project

The project is already configured for Vercel deployment with:
- `vercel.json` file that defines rewrites for API requests
- Proper Next.js configuration
- All necessary dependencies in `package.json`

### 2. Login to Vercel (if not already logged in)

```bash
vercel login
```

### 3. Deploy the Application

From the frontend directory, run:

```bash
vercel --prod
```

This will deploy to production. For a preview deployment, use:

```bash
vercel
```

### 4. Configuration Details

The `vercel.json` file contains:

```json
{
  "version": 2,
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": https://shaikhmusman122323-hacathon.hf.space/api/:path*"
    }
  ]
}
```

This configuration:
- Sets the framework to Next.js for automatic optimization
- Rewrites all `/api/*` requests to the backend API hosted at `https://shaikhmusman122323-hacathon.hf.space`

### 5. Environment Variables (if needed)

If you need to change the backend API URL, you can update the rewrite rule in `vercel.json` or add environment variables via the Vercel dashboard.

## Post-Deployment

After successful deployment:
1. Vercel will provide a deployment URL
2. You can manage the project in your Vercel dashboard
3. Future deployments can be triggered by pushing to your Git repository if connected

## Connecting to Git Repository

For continuous deployment:
1. Connect your Git repository to Vercel
2. Vercel will automatically deploy on every push to the main branch
3. Preview deployments will be created for pull requests