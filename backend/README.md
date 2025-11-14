# Pocket Democracy Backend

Node.js Express backend for the Pocket Democracy application with authentication and 2FA support.

## Features

- User registration with email and phone number
- JWT-based authentication
- Two-Factor Authentication (2FA) via email or SMS
- Password hashing with bcryptjs
- Email sending with Nodemailer
- SMS sending with Twilio (optional)

## Project Structure

```
backend/
├── src/
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── server.js          # Main server file
├── data/
│   └── users.json         # User database (JSON file for demo)
├── package.json
├── .env.example
└── README.md
```

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register
- **POST** `/api/auth/register`
- **Body**:
```json
{
  "email": "user@example.com",
  "phoneNumber": "+1234567890",
  "password": "securepassword",
  "birthDate": "1990-01-01"
}
```
- **Response**:
```json
{
  "message": "User registered successfully",
  "userId": "uuid",
  "twoFactorMethod": "email"
}
```

#### Login
- **POST** `/api/auth/login`
- **Body**:
```json
{
  "emailOrPhone": "user@example.com",
  "password": "securepassword"
}
```
- **Response** (if 2FA enabled):
```json
{
  "message": "2FA code sent",
  "userId": "uuid",
  "twoFactorMethod": "email"
}
```

#### Verify 2FA Code
- **POST** `/api/auth/verify-2fa`
- **Body**:
```json
{
  "userId": "uuid",
  "code": "123456"
}
```
- **Response**:
```json
{
  "message": "2FA verification successful",
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "birthDate": "1990-01-01"
  }
}
```

#### Get Current User
- **GET** `/api/auth/me`
- **Headers**: `Authorization: Bearer jwt_token_here`
- **Response**:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "phoneNumber": "+1234567890",
    "birthDate": "1990-01-01"
  }
}
```

## Environment Variables

Create a `.env` file with the following:

```
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# Email Configuration (Optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# SMS Configuration (Optional - Twilio)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Setting up Email (Gmail):
1. Go to myaccount.google.com
2. Select Security in left menu
3. Enable 2-Step Verification
4. Generate an App Password
5. Use the 16-character password in EMAIL_PASSWORD

## Data Storage

Currently, the backend uses JSON file storage (`data/users.json`) for demo purposes.

**For production, replace with a database:**
- MongoDB
- PostgreSQL
- MySQL
- etc.

## Security Notes

⚠️ **Current implementation is for development/demo purposes**

For production, implement:
- [ ] Real database instead of JSON
- [ ] Rate limiting on auth endpoints
- [ ] HTTPS/SSL
- [ ] Email verification before full registration
- [ ] Password reset functionality
- [ ] Account lockout after failed attempts
- [ ] CSRF protection
- [ ] Input validation and sanitization
- [ ] Secure password hashing (already using bcryptjs)
- [ ] JWTs with rotation

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "phoneNumber": "+1234567890",
    "password": "password123",
    "birthDate": "1990-01-01"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrPhone": "test@example.com",
    "password": "password123"
  }'
```

### Verify 2FA
```bash
curl -X POST http://localhost:5000/api/auth/verify-2fa \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "your-user-id",
    "code": "123456"
  }'
```

## License

ISC
