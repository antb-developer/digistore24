
const axios = require('axios');

const DIGISTORE24_API_URL = 'https://www.digistore24.com/api/call/';
const DIGISTORE24_API_KEY = "1219272-NEGfzDC8v4nPA0Z2ohq317nfjMtCkD8jCoJT6wKY";

const createInvoice = async (invoiceData) => {
    try {
        const response = await axios.post(DIGISTORE24_API_URL, invoiceData, {
            headers: {
                'Authorization': `Bearer ${DIGISTORE24_API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating invoice:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const retrieveApiKey = async (token) => {
  try {
      const response = await axios.get(DIGISTORE24_API_URL + '/retrieveApiKey/?token=' + token, {
        headers: {
          'X-DS-API-KEY': DIGISTORE24_API_KEY
        }
      });
      return response.data;
  } catch (error) {
      console.error('Error :', error.response ? error.response.data : error.message);
      throw error;
  }
};

const requestApiKey = async (data) => {
    try {
      // var api_url = 'https://www.digistore24.com/api/call/' + method + '/?';
        const response = await axios.get(DIGISTORE24_API_URL + '/requestApiKey/?permissions=writable&return_url=' + 'https://localhost:3000/return_url', {
          headers: {
            'X-DS-API-KEY': DIGISTORE24_API_KEY
          }
        });
        return response.data;
    } catch (error) {
        console.error('Error :', error.response ? error.response.data : error.message);
        throw error;
    }
};

const sendNotification = (customerEmail, invoiceDetails) => {
    // Implement email notification logic here
    console.log(`Sending email to ${customerEmail} with invoice details:`, invoiceDetails);
};

module.exports = { createInvoice, sendNotification, requestApiKey, retrieveApiKey };
