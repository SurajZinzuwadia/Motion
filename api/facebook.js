const axios = require('axios');

const API_URL = 'https://graph.facebook.com/v19.0/me?fields=id,name,last_name';

async function fetchData(accessToken) {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = { fetchData };
