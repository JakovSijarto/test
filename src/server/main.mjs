import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import ViteExpress from "vite-express";

const app = express();
const stripeClient = Stripe("sk_test_51MFvJjGp8AV7HwpgNwwtOwrdddWVOUgT8geaoYasK9hgRUVgBbmxiidWcTslDnACcKElJBfpJ5Qvm4HutsGsnhzS00cIhYeEJP");


app.use(cors());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/create-checkout-session', async (req, res) => {
  const { price, productName } = req.body;

  const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'RSD',
          product_data: {
            name: productName,
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/home',
    cancel_url: 'http://localhost:3000/home',
  });

  res.json({ id: session.id });
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
