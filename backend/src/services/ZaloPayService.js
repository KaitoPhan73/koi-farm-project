const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

class ZaloPayService {
    async createOrder(amount, description, appUser = 'crisbryann') {
        const appId = process.env.ZALO_APP_ID;
        const appTransId = `${Date.now()}`; 
        const embedData = '{}';
        const items = '[]';
        const key1 = process.env.ZALO_KEY1;
        const endpoint = process.env.ZALO_ENDPOINT;

        const appTime = Math.floor(Date.now() / 1000);
        const data = {
            app_id: appId,
            app_trans_id: appTransId,
            app_user: appUser,
            amount,
            app_time: appTime,
            embed_data: embedData,
            item: items,
            description,
            bank_code: '',
            callback_url: 'https://github.com/KaitoPhan73/green-bags-fe', 
        };

        const dataString = `${appId}|${appTransId}|${appUser}|${amount}|${appTime}|${embedData}|${items}`;
        data.mac = crypto.createHmac('sha256', key1).update(dataString).digest('hex');

        try {
            const response = await axios.post(endpoint, data);
            return response.data;
        } catch (error) {
            throw new Error(error.response ? error.response.data : 'Error calling ZaloPay API');
        }
    }
}

module.exports = new ZaloPayService();
