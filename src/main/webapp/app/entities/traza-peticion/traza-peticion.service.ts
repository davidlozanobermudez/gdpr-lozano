import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITrazaPeticion } from 'app/shared/model/traza-peticion.model';

type EntityResponseType = HttpResponse<ITrazaPeticion>;
type EntityArrayResponseType = HttpResponse<ITrazaPeticion[]>;

@Injectable({ providedIn: 'root' })
export class TrazaPeticionService {
    public resourceUrl = SERVER_API_URL + 'api/traza-peticions';

    constructor(protected http: HttpClient) {}

    create(trazaPeticion: ITrazaPeticion): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(trazaPeticion);
        return this.http
            .post<ITrazaPeticion>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(trazaPeticion: ITrazaPeticion): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(trazaPeticion);
        return this.http
            .put<ITrazaPeticion>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITrazaPeticion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITrazaPeticion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(trazaPeticion: ITrazaPeticion): ITrazaPeticion {
        const copy: ITrazaPeticion = Object.assign({}, trazaPeticion, {
            fecha: trazaPeticion.fecha != null && trazaPeticion.fecha.isValid() ? trazaPeticion.fecha.toJSON() : null
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
            res.body.forEach((trazaPeticion: ITrazaPeticion) => {
                trazaPeticion.fecha = trazaPeticion.fecha != null ? moment(trazaPeticion.fecha) : null;
            });
        }
        return res;
    }
}
