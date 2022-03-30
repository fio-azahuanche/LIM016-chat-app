/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
const { Client } = require('pg');
const bcrypt = require("bcryptjs");


const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 15432,
  database: 'default_database',
  password: 'postgres',
});

client.connect();

const updateUserValidate = async (req, res) => {
  const token = req.params.token_confirm;
  // const emailUser = {email_user:email};
  await client.query(
    `UPDATE users SET verified_user=true WHERE tokenup_user=$1`,
    [token]
  );
  res.json('Actualiza');
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

const deleteUser = async (req, res) => {
  const id = req.params.id_user;
  await client.query(`DELETE FROM users WHERE id_user = $1`, [id]);
  res.json(`user ${id} eliminado satisfactoriamente`);
};

const updateUser = async (req, res) => {
  const id = req.params.id_user;
  const { password_user, name_user } = req.body;
  console.log('este es e password',password_user);
  
  console.log('este es e name',name_user);
  if(password_user!==undefined && name_user!==undefined){
    await client.query(
      'UPDATE users SET password_user=$1, name_user=$2 WHERE id_user=$3',
      [bcrypt.hashSync(password_user,8), name_user, id]
    );
    res.json('Actualizado los datos');
  }else if(password_user===undefined || name_user!==undefined){
    await client.query(
      'UPDATE users SET name_user=$1 WHERE id_user=$2',
      [name_user, id]
    );
    res.json('Actualizado el nombre');
  }else{
    await client.query(
      'UPDATE users SET password_user=$1 WHERE id_user=$2',
      [bcrypt.hashSync(password_user,8), id]
    );
    res.json('Actualizado el password');
  }
};

const updateImgProfile = async (req,res) => {
  const id = req.params.id_user;
  const {imgProfile} = req.body;
  await client.query(
    'UPDATE users SET img_profile=$1 WHERE id_user=$2',
    [imgProfile,id]
  );
  res.json('Actualizado la imagen de perfil');

}

module.exports = {
  getUsers,
  getUsersById,
  deleteUser,
  updateUser,
  updateUserValidate,
  updateImgProfile
};
 