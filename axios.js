import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.kvote.hakk.kr/',
    timeout: 4000,
})
