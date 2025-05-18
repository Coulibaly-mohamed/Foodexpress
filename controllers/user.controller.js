import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    // req.user est injecté par le middleware validateToken
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil :', error);
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};
