require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const auth = require('./routes/auth')
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/authMe', auth);

app.get('/', (req, res) => {
    res.send('API funcionando');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
