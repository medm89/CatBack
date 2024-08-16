import { Router } from "express";
import { check } from 'express-validator';
import { createUser, login } from '../controller/user';
import { validateField } from "../middleware/validateUser";

const userRouter = Router();

userRouter.post('/register',[
    check('email','El correo no es valido').isEmail(),
    check('password','El password no es valido').isLength({ min:6}),
    validateField
    ],createUser);

userRouter.post('/login', [
    check('email','EL correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({min:6}),
    validateField
    ]
    ,login);

export default userRouter;