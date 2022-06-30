const db = require('./db');
const helper = require('./helper');

async function getNewsDb(cpf) {
    const rows = await db.query(
        `SELECT news.id, content
    FROM news inner join users on users.cpf = news.cpf where users.cpf = '${cpf}';`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data,
    }
}

async function insertNews(content, cpf) {

    const result = await db.query(
        `INSERT into NEWS (content, cpf) VALUES ('${content}', '${cpf}')`
    );

    if (result.affectedRows) {
        message = 'Inserida com sucesso';
    }

    return {
        message,
    }
}

async function updateNews(id, newContent) {

    const result = await db.query(
        `UPDATE NEWS SET content = '${newContent}' WHERE id = '${id}'`
    );

    if (result.affectedRows) {
        message = 'Atualizada com sucesso';
    }

    return {
        message,
    }
}

async function deleteNews(id) {

    const result = await db.query(
        `DELETE from NEWS WHERE id = '${id}'`
    );

    if (result.affectedRows) {
        message = 'Deletada com sucesso';
    }

    return {
        message,
    }
}

module.exports = {
    getNewsDb,
    insertNews,
    updateNews,
    deleteNews
}