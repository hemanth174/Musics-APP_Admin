# Deployment Guide for Crazy-Musics Admin

## 🚀 Quick Deploy to Render

### Step 1: Prepare Repository

1. Initialize Git repository:
```bash
cd C:\Users\heman\Desktop\Crazy-Musics-Admin
git init
git add .
git commit -m "Initial commit: Admin dashboard"
```

2. Create GitHub repository and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/Crazy-Musics-Admin.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

#### Option A: Using Render Dashboard

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `crazy-musics-admin`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: `a1b2c3d4e5f60718293a4b5c6d7e8f90`
   - `ADMIN_EMAIL`: `Admin777@gmail.com`
   - `ADMIN_PASSWORD`: `Admin117`
   - `ADMIN_NAME`: `Admin`
   - `NODE_ENV`: `production`

6. Click **"Create Web Service"**

#### Option B: Using render.yaml (Blueprint)

1. Push your code with `render.yaml` to GitHub
2. Go to Render Dashboard
3. Click **"New +"** → **"Blueprint"**
4. Select your repository
5. Render will auto-detect the `render.yaml` file
6. Fill in the secret environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `ADMIN_PASSWORD`
7. Click **"Apply"**

### Step 3: Access Your Admin Dashboard

Once deployed, your admin dashboard will be available at:
```
https://crazy-musics-admin.onrender.com
```

Login with:
- Email: `Admin777@gmail.com`
- Password: `Admin117`

## 🔧 Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your credentials

3. Start development server:
```bash
npm run dev
```

4. Access at `http://localhost:5000`

## 📝 Notes

- The free tier on Render may spin down after inactivity
- First request after inactivity may take 30-60 seconds
- For production, consider upgrading to a paid plan
- Change admin credentials via environment variables

## 🔒 Security

⚠️ **Important**: 
- Never commit `.env` file to Git
- Change default admin password in production
- Use strong JWT secret
- Enable HTTPS in production (Render does this automatically)

## 🐛 Troubleshooting

### Server won't start
- Check that all environment variables are set
- Verify MongoDB connection string is correct
- Check Render logs for errors

### Can't login
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in environment variables
- Check browser console for errors
- Ensure JWT_SECRET is set correctly

### Users not loading
- Verify MongoDB connection
- Check that main Crazy-Musics app and admin app use same database
- Review server logs for errors

## 📞 Support

For issues, check:
1. Render deployment logs
2. Browser console (F12)
3. MongoDB Atlas connection status
