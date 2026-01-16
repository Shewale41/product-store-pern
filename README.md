# PERN Store 🛍️

A full-stack product inventory management application built with PostgreSQL, Express, React, and Node.js (PERN). Features rate limiting, security middleware, and responsive UI with multiple themes.

## Tech Stack

**Backend:**
- Node.js with Express.js
- PostgreSQL (via Neon)
- Arcjet (Rate Limiting & Security)
- Helmet (Security Headers)
- Morgan (HTTP Logging)
- CORS (Cross-Origin Support)
- Dotenv (Environment Management)

**Frontend:**
- React 18 with Vite
- Zustand (State Management)
- Axios (HTTP Client)
- Tailwind CSS (Styling)
- DaisyUI (Component Library)
- React Hot Toast (Notifications)
- Lucide Icons

## Features

✅ **Product Management** - Create, Read, Update, Delete products  
✅ **Rate Limiting** - Token bucket algorithm (5 requests per 10 seconds)  
✅ **Bot Detection** - Blocks malicious bots & spoofed requests  
✅ **Security** - XSS, CSRF, SQL Injection protection  
✅ **Theme Switcher** - 10+ color themes (Pastel, Retro, Coffee, Forest, etc.)  
✅ **Responsive Design** - Mobile-first UI  
✅ **Real-time Notifications** - Toast alerts for user actions  
✅ **Database Auto-initialization** - Creates tables on startup  

## Project Structure

```
pern-store/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   └── productController.js  # CRUD operations
│   ├── lib/
│   │   └── arcjet.js            # Rate limiting & security setup
│   ├── routes/
│   │   └── productRoutes.js     # API endpoints
│   ├── seeds/
│   │   └── products.js          # Sample data
│   └── server.js                # Express app & middleware
├── frontend/
│   ├── src/
│   │   ├── Components/          # React components
│   │   ├── Pages/               # Page components
│   │   ├── store/               # Zustand stores
│   │   ├── constants/           # Theme data
│   │   └── App.jsx
│   ├── vite.config.js
│   └── tailwind.config.js
├── .env                         # Environment variables
└── package.json
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Port
PORT=3000
NODE_ENV=production

# Database (PostgreSQL)
PGHOST=your_neon_host
PGDATABASE=your_database
PGUSER=your_user
PGPASSWORD=your_password

# Arcjet (Rate Limiting & Security)
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm/yarn
- PostgreSQL database (Neon recommended)
- Arcjet API key (free tier available)

### Development Setup

1. **Clone the repository**
```bash
git clone <repo-url>
cd pern-store
```

2. **Install dependencies**
```bash
# Root
npm install

# Frontend
cd frontend
npm install
cd ..
```

3. **Configure environment**
```bash
# Copy .env template and fill in your values
cp .env.example .env
```

4. **Start backend** (Terminal 1)
```bash
npm run dev
```
Backend runs on `http://localhost:3000`

5. **Start frontend** (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Build

```bash
npm run build
```
This installs dependencies and creates optimized production bundles.

### Production Start

```bash
npm start
```
Serves both backend (port 3000) and frontend (built files) from the same server.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend with hot-reload (nodemon) |
| `npm start` | Start production server |
| `npm run build` | Build frontend and prepare for production |
| `cd frontend && npm run dev` | Start frontend dev server |
| `cd frontend && npm run build` | Build frontend for production |
| `node backend/seeds/products.js` | Seed database with sample products |

## API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Request/Response Format

**POST/PUT `/api/products`**
```json
{
  "name": "Product Name",
  "price": "99.99",
  "image": "https://example.com/image.jpg"
}
```

## Rate Limiting

Arcjet protects the API with:
- **Token Bucket Algorithm**: 5 tokens per 10 seconds
- **Initial Capacity**: 10 tokens
- **Bot Detection**: Blocks malicious bots
- **Spoofed Bot Detection**: Detects bots pretending to be legitimate

### Response Codes
- `429` - Too many requests (rate limit exceeded)
- `403` - Bot detected / Spoofed bot / Forbidden
- `200` - Success

## Security Features

**Helmet Middleware:**
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection

**Arcjet Shield:**
- XSS Protection
- CSRF Protection
- SQL Injection Prevention

**CORS:** Configured for development and production

## Database Schema

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Themes Available

- 🎨 Pastel
- 🎪 Retro
- ☕ Coffee
- 🌲 Forest
- 🌃 Cyberpunk
- 🔮 Synthwave
- 👑 Luxury
- 🍂 Autumn
- 💕 Valentine
- 💧 Aqua

## Troubleshooting

**Frontend not loading on `npm start`?**
- Ensure `.env` has `NODE_ENV=production`
- Check if frontend build exists: `frontend/dist/`
- Run `npm run build` to rebuild

**Rate limit errors in development?**
- Normal behavior - adjust refillRate in `backend/lib/arcjet.js`
- IP detection uses 127.0.0.1 in development mode

**Database connection errors?**
- Verify PostgreSQL credentials in `.env`
- Check Neon connection string format
- Ensure database exists

**Arcjet key errors?**
- Get free API key from [arcjet.com](https://arcjet.com)
- Add to `.env` as `ARCJET_KEY`

## Deployment

### Render/Railway/Heroku

1. Set environment variables in platform dashboard
2. Run build command: `npm run build`
3. Start command: `npm start`
4. Ensure `NODE_ENV=production` is set

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

ISC

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review `.env` configuration
3. Check backend console logs
4. Check frontend browser console

---

**Happy coding! 🚀**
