import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(404).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "1h" });

        return res.status(200).json({ result: existingUser, token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password don't match." });
        }

        const hashedPassword = bcrypt.hash(password, 12);

        const result = await User.create({
            name: `${firstName} ${lastName}`,
            email: email,
            password: hashedPassword
        });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "1h" });

        return res.status(200).json({ result: result, token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};