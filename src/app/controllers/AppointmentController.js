import Appointment from '../models/Appointment';
import * as Yup from 'yup';
import User from '../models/User';

class AppointmentController {

    async store(req, res) {

        // schema de validaçao 
        const schema = Yup.object().shape({
            collaborator_id: Yup.number().required(),
            date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { collaborator_id, date } = req.body;
        const collaborator = await User.findOne({
            where: { id: collaborator_id, provider: true }
        });

        if (!collaborator) {
            return res.status(400).json({ error: 'Collaborator does not exists' });
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            collaborator_id,
            date,
        });

        res.json({
            appointment
        });
    };
}

export default new AppointmentController();