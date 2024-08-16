import jwt from 'jsonwebtoken';

const generateJWT = (uid: string = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY || '',
            {
                expiresIn: '24h',
            },
            (err, token) => {
                if (err) {
                    reject('No se pudo generar un token');
                } else {
                    resolve(token as string);
                }
            }
        );
    });
};

export {
    generateJWT
}