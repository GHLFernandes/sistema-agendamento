import Appointment from '../models/Appointment';
import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import User from '../models/User';
import File from '../models/File';

class AppointmentController {
    async index(req, res) {

        const { page = 1 } = req.query;

        // pega os agendamentos do usuario logado
        const appointments = await Appointment.findAll({
            where: { // filtra os agendamentos do usuario logado
                user_id: req.userId,
                canceled_at: null
            },
            order: ['date'], // ordena por data
            attributes: ['date'], // pega apenas a data
            limit: 20, // limite de registros
            offset: (page - 1) * 20, // paginaçao
            include: [{ // pega o usuario
                model: User,
                as: 'collaborator',
                attributes: ['name', 'email'],
                include: [{
                    model: File,
                    as: 'photo',
                    attributes: ['path', 'url']
                }],

            }]
        });

        // retorna os agendamentos
        return res.json(appointments);
    }


    async store(req, res) {
        // schema de validaçao 
        const schema = Yup.object().shape({
            collaborator_id: Yup.number().required(),
            date: Yup.date().required(),
        });

        // verifica se os dados estao corretos
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        // pega o usuario logado
        const { collaborator_id, date } = req.body;

        const collaborator = await User.findOne({
            where: { id: collaborator_id, provider: true }
        });

        // verifica se o usuario existe
        if (!collaborator) {
            return res.status(400).json({ error: 'Collaborator does not exists' });
        }

        // pega a data do agendamento
        const startHour = startOfHour(parseISO(date));

        // verifica se a data do agendamento é antes de hoje
        if (isBefore(startHour, new Date())) {
            return res.status(400).json({ error: 'Past dates are not permitted' });
        }

        // verifica se o usuario ja tem um agendamento na data
        const checkAvailability = await Appointment.findOne({
            where: {
                collaborator_id,
                canceled_at: null,
                date: startHour
            }
        });

        if (checkAvailability) {
            return res.status(400).json({ error: 'Appointment date is not available' });
        }

        // cria o agendamento
        const appointment = await Appointment.create({
            user_id: req.userId,
            collaborator_id,
            date: startHour
        });

        // retorna o agendamento
        res.json({
            appointment
        });
    };
}

export default new AppointmentController();