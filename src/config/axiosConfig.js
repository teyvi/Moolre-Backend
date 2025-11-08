const axios = require('axios');
require('dotenv').config();

const apiClient = axios.create({
    baseURL:process.env.THIRD_PARTY_BASE_URL,
    headers:{
        'Authorization':`Bearer ${process.env.THIRD_PARTY_PRIVATE_KEY}`,
        'Content-Type':'application/json'
    }
})
module.exports=apiClient

