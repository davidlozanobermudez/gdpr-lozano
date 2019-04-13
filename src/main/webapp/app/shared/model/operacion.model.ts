import { ISistema } from 'app/shared/model/sistema.model';
import { IAgrupacion } from 'app/shared/model/agrupacion.model';

export const enum TipoOperacion {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    JDSFKJEF = 'JDSFKJEF'
}

export interface IOperacion {
    id?: number;
    codigo?: string;
    wsAsociado?: string;
    tipo?: TipoOperacion;
    sistemas?: ISistema[];
    agrupacions?: IAgrupacion[];
}

export class Operacion implements IOperacion {
    constructor(
        public id?: number,
        public codigo?: string,
        public wsAsociado?: string,
        public tipo?: TipoOperacion,
        public sistemas?: ISistema[],
        public agrupacions?: IAgrupacion[]
    ) {}
}
