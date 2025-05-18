import Restaurant from '../models/Restaurant.js';

/**
 * GET /api/restaurants
 * Liste tous les restaurants
 */
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error('Erreur lors de la récupération des restaurants :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * GET /api/restaurants/:id
 * Récupère un restaurant par ID
 */
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant non trouvé' });
    }
    res.json(restaurant);
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * POST /api/restaurants
 * Crée un nouveau restaurant
 */
export const createRestaurant = async (req, res) => {
  const { name, address, phone, openinghours } = req.body;

  try {
    const newRestaurant = new Restaurant({ name, address, phone, openinghours });
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.error('Erreur création restaurant :', error);
    res.status(400).json({ message: 'Données invalides' });
  }
};

/**
 * PUT /api/restaurants/:id
 * Met à jour un restaurant
 */
export const updateRestaurant = async (req, res) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Restaurant non trouvé' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Erreur mise à jour :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * DELETE /api/restaurants/:id
 * Supprime un restaurant
 */
export const deleteRestaurant = async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Restaurant non trouvé' });
    }
    res.json({ message: 'Restaurant supprimé avec succès' });
  } catch (error) {
    console.error('Erreur suppression :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
