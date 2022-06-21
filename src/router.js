import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import CollaboratorController from './app/controllers/CollaboratorController';
import AppointmentController from './app/controllers/AppointmentController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/create-user', UserController.store);
routes.post('/session', SessionController.store);

// Rotas autenticadas
routes.use(authMiddleware);
routes.put('/users', UserController.update);

//Lista colaboradores
routes.get('/collaborator', CollaboratorController.index)

//upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);

//Agendamento
routes.post('/appointments', AppointmentController.store);

export default routes;