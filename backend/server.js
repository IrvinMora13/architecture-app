require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandle');



const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
    res.send('API funcionando');
});


app.use(errorHandler);


connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}).catch(err => {
    console.error('Error al conectar a la base de datos:', err);
});
