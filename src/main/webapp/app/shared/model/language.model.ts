import { IVersionLeyInt } from 'app/shared/model/version-ley-int.model';
import { ISubscripcionInt } from 'app/shared/model/subscripcion-int.model';

export interface ILanguage {
    id?: number;
    codLanguage?: string;
    codRegion?: string;
    defaultLanguage?: boolean;
    versionLeyInts?: IVersionLeyInt[];
    subscripcionInts?: ISubscripcionInt[];
}

export class Language implements ILanguage {
    constructor(
        public id?: number,
        public codLanguage?: string,
        public codRegion?: string,
        public defaultLanguage?: boolean,
        public versionLeyInts?: IVersionLeyInt[],
        public subscripcionInts?: ISubscripcionInt[]
    ) {
        this.defaultLanguage = this.defaultLanguage || false;
    }
}
