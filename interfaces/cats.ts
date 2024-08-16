interface ICatBreed {
    id: string;
    name: string;
    temperament: string;
    origin: string;
    description: string;
    life_span: string;
    wikipedia_url: string;
    image?: {
        id: string;
        width: number;
        height: number;
        url: string;
    };
    reference_image_id: string;
}

export { ICatBreed }