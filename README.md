# TOČKY

video - https://calipio.com/app/play/frLH7EDk#bhPNzm6v

## Client
- cd client
- npm i
- npm run dev

## Server
- cd server
- npm i
- create .env file

```
MONGODB_URI=mongo url
JWT_SECRET_KEY="random"
CLIENT_URL="http://localhost:5173"

STRIPE_PUBLIC_KEY=stripe public key
STRIPE_SECRET_KEY=stripe secret key
```

- npm run start
- npm run stripeWebhook
