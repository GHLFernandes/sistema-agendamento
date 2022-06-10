import { Router } from 'express';
import { Sequelize } from 'sequelize';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async(req, res) => {

    const user = await User.create({
        name: 'Gabriel',
        email: 'gf@gmail.com',
        password_hash: '123456',
    });
    console.log(user.toJSON());
    return res.json(user);
});

export default routes;