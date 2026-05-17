const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders'); 

dotenv.config();
const app = express();

mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log('Conectado a MongoDB Atlas 🚀'))
    .catch(err => console.log('Error de conexión:', err));

app.use(express.json());
app.use(cors());
app.use(express.static('public')); 

app.get('/', (req, res) => res.send('API funcionando correctamente'));

app.use('/api/user', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));