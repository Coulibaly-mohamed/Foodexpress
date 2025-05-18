import express from "express";
import { createRestaurant, updateRestaurant, deleteRestaurant, getAllRestaurants, getRestaurantById } from "../controllers/restaurantController.js"
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.use(verifyToken);
// Toutes les routes REST pour les restaurants
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', createRestaurant);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

export default router;
