import { ILey } from 'app/shared/model/ley.model';

export interface ITipoLey {
    id?: number;
    descripcion?: string;
    leyes?: ILey[];
}

export class TipoLey implements ITipoLey {
    constructor(public id?: number, public descripcion?: string, public leyes?: ILey[]) {}
}
