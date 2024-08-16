import { Request, Response } from "express";
import User from "../models/user";
import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generateJWT";

const createUser = async (req: Request,res: Response)=>{
   try {
    const {name,email,password,state = true} = req.body;

    const newUser = new User({name,email,password,state});

    const existEmail = await User.findOne({ email });
    if( existEmail){
       return res.status(400).json({
            msg:'El correo ya esta registrado'
        });
    }

    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync(password,salt);

    await newUser.save();
    return res.status(200).json({
        "msg": "Usuario creado correctamente",
        newUser
    });

   } catch (error) {
    return res.status(500).json({"msj": "Ocurrio un error al crear el usuario", error})
   }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                msg: 'El usuario no se encontró en la BD'
            });
        }
        if (!user.state) {
            return res.status(400).json({
                msg: 'El usuario no se encuentra activo'
            });
        }
        const validatePassword = bcryptjs.compareSync(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({
                msg: 'El password no es correcto'
            });
        }
        const token = await generateJWT(user.id);

        return res.status(200).json({
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error en el sistema',
            error
        });
    }
};
export {
    createUser,
    login
}