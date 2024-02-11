import { Router } from "express";
import { list, create } from '../controllers/content.controller'
import isAuth from "../middlewares/isAuth";

const router = Router();

router.get('/', list)
router.post('/', [isAuth], create)


export default router;