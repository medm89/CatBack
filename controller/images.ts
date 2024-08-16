import axios from "axios";
import { Request, Response } from "express";
import { IimgBreed } from "../interfaces/image";

const imagesbybreedid = async (req: Request, res: Response)=>{
    const breed_id: any = req.query.breed_ids || null;
    const limit: any  = req.query.limit || 10 ;
    const queryParams = new URLSearchParams();
    if(breed_id){
        queryParams.append('breed_ids',breed_id);
    }else{
        res.status(400).json({
            msg:'Se necesita el campo de busqueda'
        });
    }
    if(limit){
        queryParams.append('limit', limit);
    }
    await axios({
        method: 'get',
        url: `${process.env.CAT_ARL}images/search?${queryParams.toString()}`,
        headers: {
            'x-api-key': process.env.CAT_TOKEN || ''
        }
    }).then((response)=>{
        
        const cats:IimgBreed[]= response.data.map((cat: any): IimgBreed => ({
            id: cat.id,
            url: cat.url,
            width: cat.width,
            height: cat.height,
        }));
        res.status(200).json(
            cats
        );
    }).catch( (error)=>{
        res.status(500).json({ msj: 'Error al obtener las imagenes del gato', error });
    }); 
};


export {
    imagesbybreedid
}
