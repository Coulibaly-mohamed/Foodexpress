import express from 'express';
import {verifyToken} from '../middleware/verifyToken.js';
import {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
} from '../controllers/menuController.js';


const router = express.Router();

// Toutes les routes nécessitent une authentification
router.use(verifyToken);

//  GET - Tous les menus
router.get('/', getAllMenus);

// GET - Menu par ID
router.get('/:id', getMenuById);

// POST - Créer un nouveau menu
router.post('/', createMenu);

// PUT - Modifier un menu
router.put('/:id', updateMenu);

// DELETE - Supprimer un menu
router.delete('/:id', deleteMenu);

export default router;
