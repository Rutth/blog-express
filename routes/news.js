var express = require('express');
var router = express.Router();
const news = require('../database/news-db');

router.post('/list', async (req, res) => {
    const { cpf } = req.body
    try {
        return res.json(await news.getNewsDb(cpf))
    } catch (ex) {
        console.error(`Error ===== `, ex.message);
        return res.status(500).send({ message: "Ocorreu um erro inesperado. Tente novamente" })
    }
})

router.post('/add', async (req, res) => {
    const { content, cpf } = req.body
    try {
        return res.json(await news.insertNews(content, cpf))
    } catch (ex) {
        console.error(`Error ===== `, ex.message);
        return res.status(500).send({ message: "Ocorreu um erro inesperado. Tente novamente" })
    }
})

router.put('/update', async (req, res) => {
    const { id, content } = req.body
    try {
        return res.json(await news.updateNews(id, content))
    } catch (ex) {
        console.error(`Error ===== `, ex.message);
        return res.status(500).send({ message: "Ocorreu um erro inesperado. Tente novamente" })
    }
})

router.delete('/delete', async (req, res) => {
    const { id } = req.body
    try {
        return res.json(await news.deleteNews(id))
    } catch (ex) {
        console.error(`Error ===== `, ex.message);
        return res.status(500).send({ message: "Ocorreu um erro inesperado. Tente novamente" })
    }
})

module.exports = router;
