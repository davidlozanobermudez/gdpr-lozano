import { Moment } from 'moment';
import { IContacto } from 'app/shared/model/contacto.model';
import { ISubscripcion } from 'app/shared/model/subscripcion.model';

export interface IContactoSubscripcion {
    id?: number;
    fecha?: Moment;
    contacto?: IContacto;
    subscripcion?: ISubscripcion;
}

export class ContactoSubscripcion implements IContactoSubscripcion {
    constructor(public id?: number, public fecha?: Moment, public contacto?: IContacto, public subscripcion?: ISubscripcion) {}
}
