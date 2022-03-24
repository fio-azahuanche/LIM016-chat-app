/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
const { Client } = require('pg');
const { sendEmail } = require('../../config/mail.config');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 15432,
  database: 'default_database',
  password: 'postgres',
});

client.connect();

const updateUserValidate = async (req, res) => {
  const email = req.params.email_user;
  // const emailUser = {email_user:email};
  await client.query(
    `UPDATE users SET verified_user=true WHERE email_user=$1`,
    [email]
  );
  res.json('Actualiza');
};

/* const validate = async (email) => {
  await updateUserValidate(email)
}; */

const getTemplate = (name, email) => {
  console.log('entro getTemplate',name,email);
  return `
    Confirma para continuar, ${name} !
    <a href="http://localhost:3002/users/email/${email}"><button>Confirmar</button></a>
    `;
};

const getUsers = async (req, res) => {
  const response = await client.query('SELECT * FROM users');
  res.status(200).json(response.rows);
};

const getUsersById = async (req, res) => {
  const id = req.params.id_user;
  const response = await client.query(
    'SELECT * FROM users WHERE id_user = $1',
    [id]
  );
  res.json(response.rows);
};

const createUsers = async (req, res) => {
  const { email, password, name, verified, status } = req.body;
  const duplicate_user = await client.query(
    'SELECT * FROM users WHERE email_user = $1',
    [email]
  );
  const userData = duplicate_user.rows;
  console.log(name, email);
  if (userData.length === 0) {
    const template = getTemplate(name, email);

    //* Enviar email
    await sendEmail(email, 'Bienvenido a talktech', template);
    await client.query(
      `INSERT INTO users (email_user, password_user, name_user, verified_user, status_user) VALUES ($1, $2, $3, $4, $5)`,
      [email, password, name, verified, status]
    );
    res.status(200).json({
      message: 'user added successful',
      status:200,
      body: {
        user: {
          email,
          password,
          name,
          verified,
        },
      },
    });
  } else {
    res.status(202).json({
      message: 'email duplicated',
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id_user;
  await client.query(`DELETE FROM users WHERE id_user = $1`, [id]);
  res.json(`user ${id} eliminado satisfactoriamente`);
};

const updateUser = async (req, res) => {
  const id = req.params.id_user;
  const { password_user, name_user } = req.body;
  await client.query(
    'UPDATE users SET password_user=$1, name_user=$2 WHERE id_user=$3',
    [password_user, name_user, id]
  );
  res.json('Actualizado los datos');
};

module.exports = {
  getUsers,
  createUsers,
  getUsersById,
  deleteUser,
  updateUser,
  updateUserValidate
};
