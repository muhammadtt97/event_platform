import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { amount } = req.body;

    // Initialize Paystack transaction
    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
      amount: amount * 100, // Paystack requires amount in kobo (1 Naira = 100 kobo)
      email: 'customer@example.com', // Replace with customer's email
      currency: 'NGN', // Nigerian Naira
    }, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = response.data;
    res.status(200).json({ authorization_url: data.data.authorization_url });
  } catch (error) {
    console.error('Error initializing Paystack transaction:', error);
    res.status(500).json({ error: 'Failed to initialize transaction' });
  }
}
