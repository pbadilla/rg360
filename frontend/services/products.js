// In your service or component
import api from './axiosInstance';

// GET
api.get('/products')
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// POST
api.post('/products', { name: 'New Product' })
  .then((data) => console.log(data))
  .catch((err) => console.error(err));