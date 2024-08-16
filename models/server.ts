import express, { Application } from "express";
import cors from "cors";
import catRoutes from "../routes/cats"; 
import imgRoutes from "../routes/images";
import { dbConnection } from "../database/database";
import userRouter from "../routes/user";

class Server {
    app: Application;
    port: string;
    catsRoutePath: string;
    imgRoutePath: string;
    userRoutePath: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.catsRoutePath = '/api/cats';
        this.imgRoutePath  = '/api/img';
        this.userRoutePath  = '/api/user';
        this.conectarBD();
        this.middlewares();
        this.routes();   
    }
    async conectarBD(){
        await dbConnection();
    }
    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(cors());
    }
    
    routes(){

       this.app.use(this.catsRoutePath, catRoutes); 
       this.app.use(this.imgRoutePath, imgRoutes);
       this.app.use(this.userRoutePath,userRouter);

    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`app listening at http://localhost:${this.port}`);
        });
    }
}
export default Server;
        
