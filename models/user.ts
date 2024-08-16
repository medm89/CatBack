import { Schema, model } from 'mongoose';
import { Iuser } from '../interfaces/user';
const UserSchema = new Schema<Iuser>({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Es obligatorio tener la contraseña']
    },
    state: {
        type: Boolean,
        default: true
    }
});
UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

const User = model<Iuser>('user', UserSchema);
export default User;