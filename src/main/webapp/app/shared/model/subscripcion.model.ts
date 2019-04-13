import { ISubscripcionInt } from 'app/shared/model/subscripcion-int.model';
import { IContactoSubscripcion } from 'app/shared/model/contacto-subscripcion.model';

export interface ISubscripcion {
    id?: number;
    codigo?: string;
    langs?: ISubscripcionInt[];
    subscripcionesContactos?: IContactoSubscripcion[];
}

export class Subscripcion implements ISubscripcion {
    constructor(
        public id?: number,
        public codigo?: string,
        public langs?: ISubscripcionInt[],
        public subscripcionesContactos?: IContactoSubscripcion[]
    ) {}
}
