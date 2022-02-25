import express from 'express';
import Users from './modules/Users';
import Frontend from  './modules/Frontend';


const routes = express.Router();

//ROUTES

routes.get('/teste', (req, res) => {
  res.status(200).send({ status: 'It Works' });
});

// Users
routes.post('/login', Users.login);
routes.post('/create-user', Users.createUser);

routes.get('/', Frontend.controllerApp);

export default routes;
