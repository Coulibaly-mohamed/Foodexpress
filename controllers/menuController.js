import Menu from '../models/Menu.js';

// Obtenir tous les menus
export const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate('restaurantId', 'name');
    res.json(menus);
  } catch (error) {
    console.error('Erreur lors de la récupération des menus :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir un menu par ID
export const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate('restaurantId', 'name');
    if (!menu) return res.status(404).json({ message: 'Menu non trouvé' });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Créer un menu
export const createMenu = async (req, res) => {
  try {
    const { name, description, price, restaurantId } = req.body;
    const menu = new Menu({ name, description, price, restaurantId });
    await menu.save();
    res.status(201).json(menu);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du menu', error });
  }
};

// Mettre à jour un menu
export const updateMenu = async (req, res) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMenu) return res.status(404).json({ message: 'Menu non trouvé' });
    res.json(updatedMenu);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error });
  }
};

// Supprimer un menu
export const deleteMenu = async (req, res) => {
  try {
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedMenu) return res.status(404).json({ message: 'Menu non trouvé' });
    res.json({ message: 'Menu supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
