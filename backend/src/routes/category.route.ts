import { Router } from "express";
import { list, create, deleteById } from '../controllers/category.controller'
import isAuth from "../middlewares/isAuth";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

router.get('/', [isAuth], list)
router.post('/', [isAuth, isAdmin], create)
router.delete('/:id', [isAuth, isAdmin], deleteById)

export default router