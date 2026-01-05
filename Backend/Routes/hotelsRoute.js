import express from 'express';
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from '../controllers/hotelController.js';
const router = express.Router();


router.post("/createNew", createHotel);
router.put("/:id", updateHotel);
router.delete('/:id', deleteHotel)
router.get("/:id", getHotel);
router.get("/getAll",getAllHotel);

export default router;