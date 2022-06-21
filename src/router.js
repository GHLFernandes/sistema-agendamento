import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import CollaboratorController from './app/controllers/CollaboratorController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';

const routes = new Router();
const upload = multer(multerConfig);

//criar usuario
routes.post('/create-user', UserController.store);

//login
routes.post('/session', SessionController.store);

// Rotas autenticadas
routes.use(authMiddleware);

//alterar colaborador
routes.put('/users', UserController.update);

//Listar colaboradores
routes.get('/collaborator', CollaboratorController.index)

//Listar de agendamento
routes.get('/appointments', AppointmentController.index);

// Listar agendamentos do usuario logado
routes.get('/schedule', ScheduleController.index);

//upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);

//Criar Agendamento
routes.post('/appointments', AppointmentController.store);


export default routes;