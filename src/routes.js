import express from 'express';
import Users from './modules/Users';


const routes = express.Router();

//ROUTES

routes.get('/', (req, res) => {
  res.status(200).send({ status: 'It works' });
});

// Users
routes.post('/login', Users.login);
routes.post('/create-user', Users.createUser);



export default routes;
