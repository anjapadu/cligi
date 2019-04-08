import axios from 'axios';

export const getTime = () => axios.get(`http://worldclockapi.com/api/json/utc/now`);