const db = require('./db');
const helper = require('./helper');
const config = require('./config/config');

async function getUsersDb() {
    const rows = await db.query(
        `SELECT id, name, email, cpf
    FROM users`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data,
    }
}

async function insertUsers(name, email, password, cpf) {

    const result = await db.query(
        `INSERT into USERS (name, email, password, cpf) VALUES ('${name}', '${email}', '${password}', '${cpf}')`
    );

    if (result.affectedRows) {
        message = 'Cadastrado com sucesso';
    }

    return {
        message,
    }
}

async function verifyUser(password, cpf) {

    const user = await db.query(
        `SELECT * from USERS WHERE cpf = ? AND password = ?`, [cpf, password]
    );
    return { user }
}

module.exports = {
    getUsersDb,
    insertUsers,
    verifyUser
}