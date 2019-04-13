import { Moment } from 'moment';
import { IContacto } from 'app/shared/model/contacto.model';

export const enum TipoNotificacion {
    EMAIL = 'EMAIL',
    TELEFONO = 'TELEFONO',
    SISTEMA = 'SISTEMA',
    SMS = 'SMS',
    WS = 'WS'
}

export const enum NombreOperacion {
    ACEPTACION_VERSION_LEY = 'ACEPTACION_VERSION_LEY',
    ALTA_SUBSCRIPCION = 'ALTA_SUBSCRIPCION',
    ANONIMIZACION_CONTACTO = 'ANONIMIZACION_CONTACTO',
    BAJA_SUBSCRIPCION = 'BAJA_SUBSCRIPCION',
    CONFIRMADA_BAJA_LEY = 'CONFIRMADA_BAJA_LEY',
    CONSULTA_ESTADO_LEY = 'CONSULTA_ESTADO_LEY',
    CREACION_CONTACTO = 'CREACION_CONTACTO',
    DECLINACION_CONTACTO = 'DECLINACION_CONTACTO',
    DECLINACION_VERSION_LEY = 'DECLINACION_VERSION_LEY',
    ENVIO_LEY = 'ENVIO_LEY',
    RECHAZO_ACEPTA_LEY_POR_VENCIMIENTO = 'RECHAZO_ACEPTA_LEY_POR_VENCIMIENTO',
    SOLICITUD_BAJA_LEY = 'SOLICITUD_BAJA_LEY'
}

export interface ITrazaPeticion {
    id?: number;
    tipoNotificacion?: TipoNotificacion;
    nombreOperacion?: NombreOperacion;
    fecha?: Moment;
    observaciones?: string;
    contacto?: IContacto;
}

export class TrazaPeticion implements ITrazaPeticion {
    constructor(
        public id?: number,
        public tipoNotificacion?: TipoNotificacion,
        public nombreOperacion?: NombreOperacion,
        public fecha?: Moment,
        public observaciones?: string,
        public contacto?: IContacto
    ) {}
}
