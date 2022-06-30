var express = require('express');
var router = express.Router();
const users = require('../database/users-db');

/* GET users listing. */
router.get('/list', async function (req, res, next) {
  try {
    return res.json(await users.getUsersDb())
  } catch (ex) {
    console.error(`Error ===== `, ex.message);
    next(ex);
  }

});

router.post('/add', async function (req, res, next) {
  try {
    const { name, email, password, cpf } = req.body
    retorno = res.json(await users.insertUsers(name, email, password, cpf))
    return res.status(201).send(retorno)

  } catch (err) {
    console.log(err.message)
    return res.status(500).send({ message: "Ocorreu um erro inesperado. Tente novamente" })
    // next(err);
  }
});

router.post('/login', async function (req, res, next) {
  try {
    const { password, cpf } = req.body

    if (password != null && cpf != null) {
      retorno = await users.verifyUser(password, cpf)

      if (retorno.user.length > 0) {
        return res.status(200).send(retorno.user[0])
      } else {
        return res.status(400).send({ message: "Usuário não encontrado" })
      }
    } else {
      return res.status(400).send({ message: "Campos não preenchidos" })
    }

  } catch (err) {
    console.log(err.message)
    return res.status(500).send({ message: "Ocorreu um erro inesperado. Tente novamente" })
    // next(err);
  }
});


module.exports = router;
