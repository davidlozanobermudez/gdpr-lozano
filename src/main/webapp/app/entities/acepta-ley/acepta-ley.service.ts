import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAceptaLey } from 'app/shared/model/acepta-ley.model';

type EntityResponseType = HttpResponse<IAceptaLey>;
type EntityArrayResponseType = HttpResponse<IAceptaLey[]>;

@Injectable({ providedIn: 'root' })
export class AceptaLeyService {
    public resourceUrl = SERVER_API_URL + 'api/acepta-leys';

    constructor(protected http: HttpClient) {}

    create(aceptaLey: IAceptaLey): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(aceptaLey);
        return this.http
            .post<IAceptaLey>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(aceptaLey: IAceptaLey): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(aceptaLey);
        return this.http
            .put<IAceptaLey>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAceptaLey>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAceptaLey[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(aceptaLey: IAceptaLey): IAceptaLey {
        const copy: IAceptaLey = Object.assign({}, aceptaLey, {
            fechaEnvio: aceptaLey.fechaEnvio != null && aceptaLey.fechaEnvio.isValid() ? aceptaLey.fechaEnvio.toJSON() : null,
            fechaAceptacion:
                aceptaLey.fechaAceptacion != null && aceptaLey.fechaAceptacion.isValid() ? aceptaLey.fechaAceptacion.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fechaEnvio = res.body.fechaEnvio != null ? moment(res.body.fechaEnvio) : null;
            res.body.fechaAceptacion = res.body.fechaAceptacion != null ? moment(res.body.fechaAceptacion) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((aceptaLey: IAceptaLey) => {
                aceptaLey.fechaEnvio = aceptaLey.fechaEnvio != null ? moment(aceptaLey.fechaEnvio) : null;
                aceptaLey.fechaAceptacion = aceptaLey.fechaAceptacion != null ? moment(aceptaLey.fechaAceptacion) : null;
            });
        }
        return res;
    }
}
