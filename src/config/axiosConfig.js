const axios = require('axios');
require('dotenv').config();

const apiClient = axios.create({
    baseURL:process.env.MOOLRE_API_BASE_URL,
    headers:{
        'Content-Type':'application/json',
        'X-API-USER':process.env.MOOLRE_API_USER_KEY,
        'X-API-KEY':process.env.MOOLRE_API_PRIVATE_KEY
    }
})
module.exports=apiClient;
