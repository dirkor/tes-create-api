const express = require('express');
const path = require('path');

const app = express();

//Middleware. --> Ketika client melakukan request, program middleware ini akan mengambil dan menampilkan url request dari client pada console.log sebelum melanjutkan eksekusi fungsi pada server 
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};
//init logger / menjalan middleware bernama logger
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//routing
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server start di port ${PORT}`));
