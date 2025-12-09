# Crazy-Musics Admin Dashboard

Standalone admin dashboard for managing Crazy-Musics application.

## Features

- 🔐 Secure admin authentication
- 👥 User management (CRUD operations)
- 📊 Analytics dashboard
- 📋 Reports generation
- ⚙️ System settings
- 🎨 Modern responsive UI

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=Admin777@gmail.com
ADMIN_PASSWORD=Admin117
PORT=5000
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Deployment on Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add all variables from `.env`

4. Deploy!

## Admin Credentials

Default credentials:
- Email: `Admin777@gmail.com`
- Password: `Admin117`

**⚠️ Change these in production via environment variables!**

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login

### User Management
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Frontend**: Vanilla HTML, CSS, JavaScript

## Structure

```
Crazy-Musics-Admin/
├── server.js           # Express server
├── package.json        # Dependencies
├── .env               # Environment variables
├── public/            # Static files
│   ├── login.html
│   ├── dashboard.html
│   ├── analytics.html
│   ├── reports.html
│   ├── settings.html
│   ├── styles/        # CSS files
│   └── scripts/       # JavaScript files
```

## License

ISC
