import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/create-user', UserController.store);
routes.post('/session', SessionController.store);

// Rotas autenticadas
routes.use(authMiddleware);
routes.put('/users', UserController.update);

//upload de arquivos
routes.post('/files', upload.single('file'), (req, res) => {
    console.log(req.file);

    return res.json({
        message: 'ok'
    });

});

export default routes;