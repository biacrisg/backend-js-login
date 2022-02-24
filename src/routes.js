import express from 'express';
import Users from './modules/Users';


const routes = express.Router();

//ROUTES

routes.get('/', (req, res) => {
  res.status(200).send({ status: 'Welcome Split Risk REST API' });
});

// Users
routes.post('/login', Users.login);
routes.post('/create-user', Users.createUser);



export default routes;
