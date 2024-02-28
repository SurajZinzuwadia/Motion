require('dotenv').config();
const { fetchData } = require('./api/facebook');
const { checkRateLimit, handleRateLimitError } = require('./utils/rateLimit');

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

async function startDataFetching(interval) {
    console.log('Fetching data every 2 seconds...');
    setInterval(async () => {
        try {
            const response = await fetchData(ACCESS_TOKEN);
            console.log('Data received:', response.data);
            checkRateLimit(response.headers);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error && error.response.data.error.code) {
                const errorCode = error.response.data.error.code;
                const errorMessage = error.response.data.error.message;
                handleRateLimitError(errorCode, errorMessage);
            } else {
                console.error('Error fetching data:', error.message);
            }
        }
    }, interval);
}

if (!ACCESS_TOKEN) {
    console.error("Access token not found. Please provide it in the .env file.");
} else {
    startDataFetching(2000); // Fetch data every 2 seconds
}
