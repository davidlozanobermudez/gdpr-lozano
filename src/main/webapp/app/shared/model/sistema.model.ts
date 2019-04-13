import { IOperacion } from 'app/shared/model/operacion.model';

export interface ISistema {
    id?: number;
    nombre?: string;
    operaciones?: IOperacion;
}

export class Sistema implements ISistema {
    constructor(public id?: number, public nombre?: string, public operaciones?: IOperacion) {}
}
