import { IAgrupacion } from 'app/shared/model/agrupacion.model';
import { IContactoSubscripcion } from 'app/shared/model/contacto-subscripcion.model';
import { IAceptaLey } from 'app/shared/model/acepta-ley.model';
import { ITrazaPeticion } from 'app/shared/model/traza-peticion.model';

export const enum StatusContacto {
    ACTIVO = 'ACTIVO',
    PENDIENTE_ANONIMIZACION = 'PENDIENTE_ANONIMIZACION',
    RECHAZADO = 'RECHAZADO'
}

export interface IContacto {
    id?: number;
    idCuenta?: string;
    status?: StatusContacto;
    email?: string;
    telefono?: string;
    codPais?: string;
    codIdoma?: string;
    agrupaciones?: IAgrupacion[];
    subscripcionesContactos?: IContactoSubscripcion[];
    aceptacionesLeys?: IAceptaLey[];
    trazasPeticions?: ITrazaPeticion[];
}

export class Contacto implements IContacto {
    constructor(
        public id?: number,
        public idCuenta?: string,
        public status?: StatusContacto,
        public email?: string,
        public telefono?: string,
        public codPais?: string,
        public codIdoma?: string,
        public agrupaciones?: IAgrupacion[],
        public subscripcionesContactos?: IContactoSubscripcion[],
        public aceptacionesLeys?: IAceptaLey[],
        public trazasPeticions?: ITrazaPeticion[]
    ) {}
}
