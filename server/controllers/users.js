import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from "../models/user.js";

export const signin = async (req, res) => {
    const { email, password } = req.body
    const secretOrPrivateKey = process.env.REACT_APP_JWT_SECRET
    try {
        const existingUser = await User.findOne({ email})

        if(!existingUser) return res.status(404).json({message: "Aucun utilisateur trouvé!"})
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({message: "Identifiant ou mot de passe incorrects!"})

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, secretOrPrivateKey, {expiresIn: '1h'})
        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({ message: "Une erreur survenue lors de l'operation!"})
    }
}
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName} = req.body
    const secretOrPrivateKey = process.env.REACT_APP_JWT_SECRET
    try {
        const existingUser = await User.findOne({ email})
        if(existingUser) return res.status(400).json({message: "Un compte est déjà associé à cette adresse mail!"})
        if(password !== confirmPassword) return res.status(400).json({message: "Les 2 mots de passes ne correspondent pas!"})

        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({email, password: hashedPassword, name: `${lastName} ${firstName}`})
        console.log(result)
        const token = jwt.sign({email: result.email, id: result._id}, secretOrPrivateKey, {expiresIn: '1h'})
        res.status(200).json({result, token})
    } catch (error) {
        res.status(500).json({ message: "Une erreur survenue lors de l'operation!"})
    }
}