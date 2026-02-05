---
title: Evolution Todo API
emoji: ✅
colorFrom: purple
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
---

# Evolution Todo API - Hugging Face Deployment

Deploy the Evolution Todo FastAPI backend to Hugging Face Spaces.

## 🚀 Quick Deploy

[![Duplicate Space](https://huggingface.co/datasets/huggingface/deep-rl-course/resolve/main/environments/duplicate-spaces-sm.svg)]()

Click the button above to duplicate this Space to your account.

## 📋 Prerequisites

1. **Hugging Face Account**: Sign up at [huggingface.co](https://huggingface.co)
2. **Git Large File Storage**: For smooth operation
3. **API Keys**: For AI features (optional but recommended)

## 🔧 Required Environment Variables

After creating the Space, go to **Settings** → **Repository secrets** and add:

### Database Configuration
```
Name: DATABASE_URL
Value: postgresql://username:password@hostname:port/database_name
```

### Authentication
```
Name: JWT_SECRET
Value: your_super_secret_key_at_least_32_characters_long
```

### CORS Configuration
```
Name: CORS_ORIGINS
Value: https://your-frontend.vercel.app,http://localhost:3000,http://localhost:3001
```

### AI Integration (Optional)
```
Name: GROQ_API_KEY
Value: your_groq_api_key_starting_with_gsk_

Name: GROQ_BASE_URL
Value: https://api.groq.com/openai/v1

Name: AI_MODEL
Value: openai/gpt-oss-20b
```

## 🏗️ Architecture

- **Framework**: FastAPI
- **Database**: PostgreSQL via SQLModel
- **Authentication**: JWT with bcrypt
- **AI**: Groq API integration
- **Container**: Docker

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user

### Tasks
- `GET /api/{user_id}/tasks` - Get all tasks
- `POST /api/{user_id}/tasks` - Create new task
- `PUT /api/{user_id}/tasks/{task_id}` - Update task
- `DELETE /api/{user_id}/tasks/{task_id}` - Delete task
- `PATCH /api/{user_id}/tasks/{task_id}/complete` - Toggle completion

### AI Chat
- `POST /api/{user_id}/chat` - Chat with AI assistant

## 🔒 Security

- JWT-based authentication
- Passwords hashed with bcrypt
- CORS protection configured
- Rate limiting (built-in with Hugging Face)

## 🤖 AI Features

The backend integrates with Groq API for:
- Natural language task creation
- Task management via chat
- Voice transcription (English + Urdu)
- Smart task suggestions

## 📱 Frontend Integration

Connect your frontend with:
```
NEXT_PUBLIC_API_URL=https://YOUR_USERNAME-evolution-todo-api.hf.space
```

## 🚨 Troubleshooting

### Common Issues

**Issue**: "Database connection failed"
- Solution: Verify `DATABASE_URL` format and accessibility

**Issue**: CORS errors
- Solution: Check `CORS_ORIGINS` includes your frontend URL exactly

**Issue**: "Invalid token" errors
- Solution: Verify `JWT_SECRET` is consistent between signup/login

**Issue**: AI features not working
- Solution: Check `GROQ_API_KEY` is set and valid

### Health Checks

- `/` - Root endpoint
- `/health` - Health check
- `/ready` - Readiness check
- `/docs` - API documentation

## 📈 Monitoring

Monitor your Space through the Hugging Face interface:
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, network usage
- **Errors**: Track and resolve issues

## 🔄 Updating

To update your deployment:
1. Make changes to your forked repository
2. Push changes to the main branch
3. The Space will rebuild automatically

## 📞 Support

For issues with the application logic, check the [GitHub repository](https://github.com/your-repo).

For Hugging Face Spaces issues, visit the [community forums](https://discuss.huggingface.co/).

---

Built with ❤️ using FastAPI, PostgreSQL, and Hugging Face Spaces.
