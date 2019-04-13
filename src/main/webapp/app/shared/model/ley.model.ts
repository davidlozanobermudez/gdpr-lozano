import { ITipoLey } from 'app/shared/model/tipo-ley.model';
import { IVersionLey } from 'app/shared/model/version-ley.model';
import { IAgrupacion } from 'app/shared/model/agrupacion.model';

export const enum Tipologia {
    REQUIERE_CONFIRMACION = 'REQUIERE_CONFIRMACION',
    NO_REQUIERE_CONFIRMACION = 'NO_REQUIERE_CONFIRMACION'
}

export interface ILey {
    id?: number;
    codigo?: string;
    tipologia?: Tipologia;
    requiereAnonimizacion?: boolean;
    plazoAnonimizado?: number;
    aplicaAPais?: boolean;
    codPais?: string;
    tipoLey?: ITipoLey;
    versiones?: IVersionLey[];
    agrupaciones?: IAgrupacion[];
}

export class Ley implements ILey {
    constructor(
        public id?: number,
        public codigo?: string,
        public tipologia?: Tipologia,
        public requiereAnonimizacion?: boolean,
        public plazoAnonimizado?: number,
        public aplicaAPais?: boolean,
        public codPais?: string,
        public tipoLey?: ITipoLey,
        public versiones?: IVersionLey[],
        public agrupaciones?: IAgrupacion[]
    ) {
        this.requiereAnonimizacion = this.requiereAnonimizacion || false;
        this.aplicaAPais = this.aplicaAPais || false;
    }
}
