
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { createInvoice, sendNotification, requestApiKey, retrieveApiKey } = require('./digistore24Service');

const app = express();
app.use(bodyParser.json());

app.get('/return_url', async (req, res) => {
  console.log(req.query);
  res.send('ok');
});

app.get('/', async (req, res) => {
  try {
      const inn = await requestApiKey({});
      console.log(inn.data);
      const d = await retrieveApiKey(inn.data.request_token);
      console.log(d);
  } catch (error) {
    console.log(error);
  }
  res.send('ok');
});

app.post('/create-invoice', async (req, res) => {
    try {
        const invoiceData = req.body;
        const invoice = await createInvoice(invoiceData);
        sendNotification(invoiceData.customerEmail, invoice);
        res.status(201).json({ message: 'Invoice created and notification sent', invoice });
    } catch (error) {
        res.status(500).json({ message: 'Error creating invoice', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
