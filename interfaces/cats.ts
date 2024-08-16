interface ICatBreed {
    id: string;
    name: string;
    image?: {
        id: string;
        width: number;
        height: number;
        url: string;
    };
    reference_image_id: string;
}

export { ICatBreed }