import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContactoSubscripcion } from 'app/shared/model/contacto-subscripcion.model';

type EntityResponseType = HttpResponse<IContactoSubscripcion>;
type EntityArrayResponseType = HttpResponse<IContactoSubscripcion[]>;

@Injectable({ providedIn: 'root' })
export class ContactoSubscripcionService {
    public resourceUrl = SERVER_API_URL + 'api/contacto-subscripcions';

    constructor(protected http: HttpClient) {}

    create(contactoSubscripcion: IContactoSubscripcion): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(contactoSubscripcion);
        return this.http
            .post<IContactoSubscripcion>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(contactoSubscripcion: IContactoSubscripcion): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(contactoSubscripcion);
        return this.http
            .put<IContactoSubscripcion>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IContactoSubscripcion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IContactoSubscripcion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(contactoSubscripcion: IContactoSubscripcion): IContactoSubscripcion {
        const copy: IContactoSubscripcion = Object.assign({}, contactoSubscripcion, {
            fecha: contactoSubscripcion.fecha != null && contactoSubscripcion.fecha.isValid() ? contactoSubscripcion.fecha.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((contactoSubscripcion: IContactoSubscripcion) => {
                contactoSubscripcion.fecha = contactoSubscripcion.fecha != null ? moment(contactoSubscripcion.fecha) : null;
            });
        }
        return res;
    }
}
