import { Moment } from 'moment';
import { IContacto } from 'app/shared/model/contacto.model';
import { IVersionLey } from 'app/shared/model/version-ley.model';

export interface IAceptaLey {
    id?: number;
    enviada?: boolean;
    fechaEnvio?: Moment;
    aceptada?: boolean;
    fechaAceptacion?: Moment;
    contacto?: IContacto;
    versionLey?: IVersionLey;
}

export class AceptaLey implements IAceptaLey {
    constructor(
        public id?: number,
        public enviada?: boolean,
        public fechaEnvio?: Moment,
        public aceptada?: boolean,
        public fechaAceptacion?: Moment,
        public contacto?: IContacto,
        public versionLey?: IVersionLey
    ) {
        this.enviada = this.enviada || false;
        this.aceptada = this.aceptada || false;
    }
}
