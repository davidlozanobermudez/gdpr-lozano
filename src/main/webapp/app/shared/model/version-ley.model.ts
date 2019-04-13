import { Moment } from 'moment';
import { IVersionLeyInt } from 'app/shared/model/version-ley-int.model';
import { ILey } from 'app/shared/model/ley.model';
import { IAceptaLey } from 'app/shared/model/acepta-ley.model';

export interface IVersionLey {
    id?: number;
    version?: string;
    fechaDesde?: Moment;
    langs?: IVersionLeyInt[];
    ley?: ILey;
    aceptacionesLeys?: IAceptaLey[];
}

export class VersionLey implements IVersionLey {
    constructor(
        public id?: number,
        public version?: string,
        public fechaDesde?: Moment,
        public langs?: IVersionLeyInt[],
        public ley?: ILey,
        public aceptacionesLeys?: IAceptaLey[]
    ) {}
}
