require('dotenv').config();
const express = require('express');
const routes = require('./src/routes');
const connection = require('./src/database'); 

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use('/api', routes);

connection.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        return connection.sync({ force: false }); 
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erro ao conectar ou sincronizar com o banco de dados:', error);
    });