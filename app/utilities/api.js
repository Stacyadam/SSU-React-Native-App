import axios from 'axios';

const api = axios.create({
	baseURL: __DEV__ ? 'https://dev-api.smallshopsunited.com/v4/' : 'https://api.smallshopsunited.com/v4/'
});

export default api;
