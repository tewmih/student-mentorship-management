# Student Mentorship Management System

A comprehensive platform connecting freshmen with senior student mentors to create meaningful relationships, foster academic growth, and build a supportive university community.

## 🏗️ Architecture

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Sequelize
- **Database**: MySQL
- **Authentication**: JWT + Role-based Access Control
- **Real-time**: Socket.IO for chat functionality

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- Git

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd studentMentorship
```

### 2. Database Setup

1. **Create MySQL Database**

   ```sql
   CREATE DATABASE Integrate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **Configure Environment Variables**

   ```bash
   cd back
   cp ../.env.example .env
   # Edit .env with your MySQL credentials
   ```

3. **Create Database Tables**
   ```bash
   cd back
   node sync.js
   ```

### 3. Start External Data Server

```bash
cd nodeServer
node server.js
# Server runs on port 3000
```

### 4. Start Backend API

```bash
cd back
npm install
node server.js
# Server runs on port 4000
```

### 5. Start Frontend

```bash
cd frontend
npm install
npm run dev
# App runs on port 5173
```

## 🔧 Configuration

### Backend Environment (.env)

```env
DB_NAME=Integrate
DB_USER=root
DB_PASS=your_password
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=your-super-secret-jwt-key
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend Environment (.env)

```env
VITE_API_URL=http://localhost:4000
```

## 📱 Available Endpoints

### Public Routes

- `POST /api/auth/login` - User authentication
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password/:token` - Password reset
- `GET /api/node/fetch` - Import student data

### Protected Routes (Require JWT)

#### Mentee Routes (Role: mentee)

- `GET /api/mentee/mentor` - View assigned mentor
- `GET /api/mentee/sessions` - List mentee sessions
- `POST /api/mentee/petition` - Submit petition
- `POST /api/mentee/session/:id/feedback` - Submit session feedback

#### Mentor Routes (Role: mentor)

- `POST /api/mentor/application` - Submit mentor application
- `GET /api/mentor/mentees` - List assigned mentees
- `POST /api/mentor/sessions` - Create session
- `GET /api/mentor/sessions` - List sessions
- `POST /api/mentor/session/:id/resources` - Upload resources

#### Student Union Routes (Role: student_union)

- `GET /api/student-union/mentor-applications` - List applications
- `GET /api/student-union/accepted-mentors` - List accepted mentors
- `POST /api/student-union/assign-mentor` - Assign mentor to mentee
- `GET /api/student-union/petitions` - List petitions
- `POST /api/student-union/petitions/:id/resolve` - Resolve petition
- `GET /api/student-union/users` - List users

#### Admin Routes (Role: admin)

- `GET /api/admin/users` - List all users
- `POST /api/admin/assign-union/:id` - Assign user to student union

#### Profile Routes

- `GET /api/profile/` - Get user profile
- `POST /api/auth/change-password` - Change password

## 🔐 Authentication Flow

1. **Login**: `POST /api/auth/login`

   - Returns JWT token + user info
   - Stores in localStorage

2. **Protected Routes**:

   - Include `Authorization: Bearer <token>` header
   - Middleware verifies JWT and role

3. **Logout**: Clears localStorage and redirects to login

## 🎯 User Roles

- **mentee**: Freshman students seeking mentorship
- **mentor**: Senior students providing guidance
- **student_union**: Student union representatives
- **admin**: System administrators

## 🧪 Testing

### Test Backend API

```bash
node test-backend.js
```

### Test Database Connection

```bash
cd back
node sync.js
```

## 📁 Project Structure

```
studentMentorship/
├── back/                    # Backend API
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic
│   ├── models/            # Database models
│   ├── routes/            # API endpoints
│   ├── middlewares/       # Auth & validation
│   ├── server.js          # Main server
│   └── sync.js            # Database sync
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API client
│   │   └── features/      # Feature-specific components
│   └── package.json
├── nodeServer/             # External data source
│   ├── server.js          # Simple Node server
│   └── students.json      # Student data
└── README.md
```

## 🚨 Security Notes

- **JWT_SECRET**: Change in production
- **Database**: Use strong passwords
- **CORS**: Configure allowed origins
- **Environment Variables**: Never commit .env files

## 🔍 Troubleshooting

### Common Issues

1. **MySQL Connection Failed**

   - Check MySQL service is running
   - Verify credentials in `.env`
   - Ensure database exists

2. **Port Already in Use**

   - Change ports in `.env` files
   - Kill existing processes

3. **CORS Errors**

   - Verify CORS_ORIGIN in backend
   - Check frontend API_URL

4. **JWT Errors**
   - Ensure JWT_SECRET is set
   - Check token expiration

### Debug Mode

Enable detailed logging:

```bash
cd back
NODE_ENV=development DEBUG=* node server.js
```

## 📈 Next Steps

- [ ] Implement password hashing
- [ ] Add email verification
- [ ] Implement file uploads
- [ ] Add real-time notifications
- [ ] Create admin dashboard
- [ ] Add analytics and reporting
- [ ] Implement search functionality
- [ ] Add mobile responsiveness

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section above

---

**Happy Coding! 🎉**
