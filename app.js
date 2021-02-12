const cors = require("cors");
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json())
//models
require('./src/models/Contato')
const Contato = mongoose.model('contatos')
//Conexão db
require('./src/db/connect')
app.get('/contatos', async (req, res) => {
    const contatosResponse = await Contato.find()
    const contatosJson = await contatosResponse
    return res.json(contatosJson)
})
app.post('/contatos', async (req, res) => {
    const novoContato = new Contato({
        nome: req.body.nome,
        email: req.body.email,
        comentario: req.body.comentario
    })
    novoContato.save()
    res.json({messagem: "Contato concluido com sucesso", contato:novoContato})
})
app.put('/contatos/:id', async (req, res) => {
    const {id} = req.params
    //pesquisando por um unico contato
    const contato = await Contato.findOne({_id: id})
    //alterando os dados existentes
    contato.nome = req.body.nome
    contato.email = req.body.email
    contato.comentario = req.body.comentario
    //salvando as alterações
    contato.save()
    res.json({message: "Contato alterado", contato: contato})
})
app.delete('/contatos/:id', async (req, res) => {
    const {id} = req.params
    //pesquisando por um unico contato
    const contato = await Contato.findOneAndDelete({_id: id})
    res.json({message: "Contato deletado com sucesso", contato: contato})
})
app.listen(3210);