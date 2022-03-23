/* eslint-disable camelcase */
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 15432,
  database: 'default_database',
  password: 'postgres',
});

client.connect();

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
  const { email_user, password_user, name_user, verified_user, status_user } =
    req.body;
  await client.query(
    `INSERT INTO users (email_user, password_user, name_user, verified_user, status_user) VALUES ($1, $2, $3, $4, $5)`,
    [email_user, password_user, name_user, verified_user, status_user]
  );
  res.json({
    message: 'user agregado satisfactoriamente',
    body: {
      user: {
        email_user,
        password_user,
        name_user,
        verified_user,
        status_user,
      },
    },
  });
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
};
