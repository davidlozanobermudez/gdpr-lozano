import { IVersionLey } from 'app/shared/model/version-ley.model';
import { ILanguage } from 'app/shared/model/language.model';

export interface IVersionLeyInt {
    id?: number;
    codLanguage?: string;
    nombre?: string;
    descripcion?: string;
    versionLey?: IVersionLey;
    language?: ILanguage;
}

export class VersionLeyInt implements IVersionLeyInt {
    constructor(
        public id?: number,
        public codLanguage?: string,
        public nombre?: string,
        public descripcion?: string,
        public versionLey?: IVersionLey,
        public language?: ILanguage
    ) {}
}
