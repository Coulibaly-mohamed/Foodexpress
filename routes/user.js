    //enregistrer un user
    //user can create accounts without authentification
    //regular users can only updates/delete their own account and can't view user's details
    import express from 'express';
    const router = express.Router();
    // const validateToken = require('../middlewares/validateToken');
    import { getProfile } from '../controllers/user.controller.js';
    import {verifyToken, verifyTokenAndAuthorization, generateToken} from '../middleware/verifyToken.js';

    router.use(verifyToken);
    router.get('/me', verifyTokenAndAuthorization, getProfile);
            // Create a new user
         router.post('/', async (req, res) => {
        const { username, email, password, role } = req.body

        try {
            const newUser = await User.create({ username, email, password, role })
            res.status(201).json(newUser)
        } catch (error) {
            console.error('Error creating user:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    })


        // Create a new user without authentification
        router.post('/register',generateToken, async (req, res) => {
            const { username, email, password, role } = req.body
            if (!username || !email || !password || !role) {
                    return res.status(400).json({ message: 'Champs requis manquants' })
                }

            try {
                    const existingUser = await User.findOne({email})

            if (existingUser) {
                return res.status(400).json({ message: 'Adresse email déjà utilisée' })
                }
            

            } catch (error) {
                console.error('Error creating user:', error)
                res.status(500).json({ error: 'Internal server error' })
            }
        })
        
        //update user
        router.put('/update', verifyToken, async (req, res) =>{
            const { username, email, password, role } = req.body
            if (!username || !email || !password || !role) {
                return res.status(400).json({ message: 'Champs requis manquants' })
                }
                try {
                    const user = await User.findByIdAndUpdate(req.user._id, req.body, {new: true})
                    res.json(user)
                    } catch (error) {
                        console.error('Error updating user:', error)
                        res.status(500).json({ error: 'Internal server error' })
                        }

        })

        //delete user
        router.delete('/delete', verifyToken, async (req, res) =>
            {
                try {
                    const user = await User.findByIdAndDelete(req.user._id)
                    res.json(user)
                    } catch (error) {
                        console.error('Error deleting user:', error)
                        res.status(500).json({ error: 'Internal server error' })
                        }
                        
            })

   

    export default router;
