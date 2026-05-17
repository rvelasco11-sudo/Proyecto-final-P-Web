const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role || 'client'
        });

        const savedUser = await user.save();
        res.json({ message: 'Usuario registrado', userId: savedUser._id });
    } catch (err) {
        res.status(400).json({ error: 'Error al registrar' });
    }
};

exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET);
    res.header('Authorization', token).json({ token: token, role: user.role });
};

exports.getClients = async (req, res) => {
    try {
        const clients = await User.find({ role: 'client' }).select('-password');
        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};