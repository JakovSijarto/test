import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import ViteExpress from "vite-express";

const app = express();
const stripeClient = Stripe("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");


app.use(cors());
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());

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
    success_url: 'https://slasticarna.onrender/home',
    cancel_url: 'https://slasticarna.onrender/home',
  });

  res.json({ id: session.id });
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
