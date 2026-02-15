# 🛒 Vikreta Vikas — Har Vyapaari ka Sahara


Vikreta Vikas is a digital empowerment platform built to support street vendors with tools they’ve long been denied :data, financial clarity, legal awareness, and community support. Street vendors are essential to urban life, yet they often work without structure, protection, or access to technology. Many rely on guesswork to plan sales, lack financial records, and face uncertainty around safe vending zones and their rights.

Vikreta Vikas helps transform this reality. The platform provides demand prediction to reduce waste, a simple financial tracker for profit visibility, information on safe vending zones, a community board for collective support, and an accessible legal and safety knowledge hub. Together, these features give vendors confidence, stability, and a stronger voice.

This project is not about replacing street vending ,it’s about uplifting it. Vikreta Vikas aims to bridge the gap between informal work and digital support, helping vendors grow with dignity and security.

---

## API ENDPOINTS

### Auth
```
POST /api/auth/register   { name, phone, password }
POST /api/auth/login      { phone, password }
GET  /api/auth/me         (token required)
```

### Demand Prediction
```
POST /api/prediction/log-sales   { date, itemsSold, revenue }
GET  /api/prediction/forecast
GET  /api/prediction/history
```

### Finance
```
POST /api/finance/income        { amount, category, note }
POST /api/finance/expense       { amount, category, note }
GET  /api/finance/summary
GET  /api/finance/weekly-report
GET  /api/finance/transactions
```

### Zones
```
GET  /api/zones
GET  /api/zones/availability
POST /api/zones/check-in    { zoneId }
POST /api/zones/check-out   { zoneId }
POST /api/zones             { name, city, capacity, coordinates }
```

### Community
```
GET  /api/community/feed
POST /api/community/post     { title, content, category }
POST /api/community/comment  { postId, content }
POST /api/community/vote     { postId }
```

### Legal
```
GET  /api/legal/articles
GET  /api/legal/search?q=keyword
GET  /api/legal/safety-guidelines
POST /api/legal/seed   (run once to populate)
```

---

## 5 BACKEND IMPLEMENTATIONS

1. **JWT Auth** — register/login with bcrypt + JWT tokens
2. **Demand Prediction** — linear regression on 7-day sales history
3. **Finance Engine** — MongoDB aggregation for income/expense/profit
4. **Zone Management** — capacity tracking, check-in/out system
5. **Community Board** — posts, nested comments, upvote system

---

## DEPLOY

### Backend → Render.com
- Build: `npm install`
- Start: `node app.js`
- Add env vars from .env

- https://team-square-one-rust.vercel.app/

### Frontend → Vercel
- Framework: Vite
- Add env: `VITE_API_URL=https://your-backend.onrender.com`
"# Team-Square-One" 
