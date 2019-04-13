import { ISubscripcion } from 'app/shared/model/subscripcion.model';
import { ILanguage } from 'app/shared/model/language.model';

export interface ISubscripcionInt {
    id?: number;
    codLanguage?: string;
    nombre?: string;
    descripcion?: string;
    subscripcion?: ISubscripcion;
    language?: ILanguage;
}

export class SubscripcionInt implements ISubscripcionInt {
    constructor(
        public id?: number,
        public codLanguage?: string,
        public nombre?: string,
        public descripcion?: string,
        public subscripcion?: ISubscripcion,
        public language?: ILanguage
    ) {}
}
