import { ILey } from 'app/shared/model/ley.model';
import { IOperacion } from 'app/shared/model/operacion.model';
import { IContacto } from 'app/shared/model/contacto.model';

export interface IAgrupacion {
    id?: number;
    codigo?: string;
    nombre?: string;
    leyes?: ILey[];
    operaciones?: IOperacion;
    contactos?: IContacto[];
}

export class Agrupacion implements IAgrupacion {
    constructor(
        public id?: number,
        public codigo?: string,
        public nombre?: string,
        public leyes?: ILey[],
        public operaciones?: IOperacion,
        public contactos?: IContacto[]
    ) {}
}
