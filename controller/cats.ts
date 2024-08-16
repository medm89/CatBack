import axios from "axios";
import { Request, Response } from "express";
import { ICatBreed } from '../interfaces/cats';

const breeds = async (_ : Request, res : Response) => {
    await axios({
        method: 'get',
        url: `${process.env.CAT_ARL}breeds`,
        headers: {
            'x-api-key': process.env.CAT_TOKEN || ''
        }
    }).then((response)=>{
        const cats:ICatBreed[]= response.data.map((cat: any): ICatBreed => ({
            id: cat.id,
            name: cat.name,
            image: cat.image,
            reference_image_id: cat.reference_image_id,
        }));
        return res.status(200).json(
            cats
        );
    }).catch( (error)=>{
        return res.status(500).json({ msj: 'Error al obtener las razas de gatos', error });
    }); 

};

const breedsId = async (req: Request, res: Response)=>{
    const { breed_id } = req.params;
    await axios({
        method: 'get',
        url: `${process.env.CAT_ARL}breeds/${breed_id}`,
        headers: {
            'x-api-key': process.env.CAT_TOKEN || ''
        }
    }).then((response)=>{
        const cats: ICatBreed = {
            id: response.data.id,
            name: response.data.name,
            reference_image_id: response.data.reference_image_id,
        }
        return res.status(200).json(
            cats
            
        );
    }).catch( (error)=>{
        return res.status(500).json({ msj: 'Error al obtener la raza de gato', error });
    }); 
};

const breedsSearch = async (req: Request, res: Response)=>{
    const query: any = req.query.q || '';
    const attachImage: any  = req.query.attach_image || '' ;
    const queryParams = new URLSearchParams();
    if(query){
        queryParams.append('q',query);
    }
    if(attachImage){
        queryParams.append('attach_image', attachImage);
    }
    await axios({
        method: 'get',
        url: `${process.env.CAT_ARL}breeds/search?${queryParams.toString()}`,
        headers: {
            'x-api-key': process.env.CAT_TOKEN || ''
        }
    }).then((response)=>{
        const cats:ICatBreed[]= response.data.map((cat: any): ICatBreed => ({
            id: cat.id,
            name: cat.name,
            image: cat.image,
            reference_image_id: cat.reference_image_id,
        }));
        return res.status(200).json(
            cats
        );
    }).catch( (error)=>{
        return res.status(500).json({ msj: 'Error en la busqueda', error });
    });
};

export {
    breeds,
    breedsId,
    breedsSearch
}
