import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

class ScheduleController {
    async index(req, res) {
        const checkUser = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!checkUser) {
            return res.status(401).json({ error: 'This user is not a collaborator' });
        }

        const { date } = req.query;

        const parseDate = parseISO(date);

        const appointments = await Appointment.findAll({
            where: {
                collaborator_id: req.userId, // filtra os agendamentos do usuario logado
                canceled_at: null,
                date: { // filtra por data.
                    [Op.between]: [
                        startOfDay(parseDate),
                        endOfDay(parseDate),
                    ],
                },
            },
            attributes: ['date'], // pega apenas a data
        });

        return res.json(appointments);
    }
}

export default new ScheduleController();