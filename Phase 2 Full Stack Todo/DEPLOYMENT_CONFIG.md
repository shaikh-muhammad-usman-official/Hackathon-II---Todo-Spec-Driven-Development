# Deployment Configuration for Hugging Face Spaces

## Backend Space Configuration (.hf.yml or Space Secrets)

### Required Secrets for Backend:
```
DATABASE_URL=postgresql://username:password@hostname:port/database
JWT_SECRET=a_very_long_random_string_for_security
CORS_ORIGINS=https://your-frontend-space.hf.space,http://localhost:3000
```

### Dockerfile for Backend (already exists):
```
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV HOST=0.0.0.0
ENV PORT=7860

EXPOSE 7860

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
```

## Frontend Space Configuration

### Required Secrets for Frontend:
```
NEXT_PUBLIC_API_URL=https://your-backend-space.hf.space
```

### Dockerfile for Frontend (if needed):
```
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown -R nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/ ./
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "start"]
```

## Deployment Steps

### 1. Deploy Backend First:
- Create a new Hugging Face Space for the backend
- Add the required secrets to Space Settings > Secrets
- Push the backend code to the Space repository
- Monitor the build logs until deployment completes

### 2. Get Backend URL:
- Note the backend space URL (e.g., `https://your-username-your-backend-app.hf.space`)

### 3. Deploy Frontend:
- Update the frontend's NEXT_PUBLIC_API_URL to point to your backend URL
- Create a new Hugging Face Space for the frontend
- Add the NEXT_PUBLIC_API_URL secret to the frontend Space
- Push the frontend code to the Space repository

### 4. Verify Connection:
- Access the frontend URL
- Test signup/signin functionality
- Verify all features work correctly
- Check browser console for any errors

## Troubleshooting Common Issues

### CORS Errors:
- Ensure CORS_ORIGINS includes your frontend URL
- Restart backend after updating CORS settings

### Database Connection Issues:
- Verify DATABASE_URL format is correct
- Check that NeonDB or other database is accessible
- Confirm SSL settings are correct

### API Connection Failures:
- Verify NEXT_PUBLIC_API_URL is set correctly
- Check that backend is accessible from frontend
- Ensure both spaces are deployed and running

## Recommended Environment Values

### For Production Deployment:
Backend .env:
```
DATABASE_URL=postgresql://user:pass@host:port/dbname?sslmode=require
CORS_ORIGINS=https://your-frontend.hf.space,https://your-frontend.hf.space/,https://www.yourdomain.com
JWT_SECRET=generate_a_strong_random_secret_that_is_at_least_32_characters_long
```

Frontend .env:
```
NEXT_PUBLIC_API_URL=https://your-backend-username.hf.space
```

## Health Checks

After deployment:
1. Backend health: GET `/` should return status message
2. Frontend loads without errors
3. Authentication flows work
4. Task CRUD operations work
5. All API endpoints respond correctly