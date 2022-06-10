import User from '../models/User';

class UserController {
    async store(req, res) {
        const userExists = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (userExists) {
            console.log(`\n*********************\n User already exists\n*********************`);
            return res.status(400).json({
                error: 'User already exists'
            });
        }

        const { id, name, email, provider } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            provider
        });
    }

    async update(req, res) {
        return await res.json({ message: true })
    }
}

export default new UserController();