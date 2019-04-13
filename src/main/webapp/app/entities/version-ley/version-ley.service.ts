import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVersionLey } from 'app/shared/model/version-ley.model';

type EntityResponseType = HttpResponse<IVersionLey>;
type EntityArrayResponseType = HttpResponse<IVersionLey[]>;

@Injectable({ providedIn: 'root' })
export class VersionLeyService {
    public resourceUrl = SERVER_API_URL + 'api/version-leys';

    constructor(protected http: HttpClient) {}

    create(versionLey: IVersionLey): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(versionLey);
        return this.http
            .post<IVersionLey>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(versionLey: IVersionLey): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(versionLey);
        return this.http
            .put<IVersionLey>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IVersionLey>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IVersionLey[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(versionLey: IVersionLey): IVersionLey {
        const copy: IVersionLey = Object.assign({}, versionLey, {
            fechaDesde: versionLey.fechaDesde != null && versionLey.fechaDesde.isValid() ? versionLey.fechaDesde.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fechaDesde = res.body.fechaDesde != null ? moment(res.body.fechaDesde) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((versionLey: IVersionLey) => {
                versionLey.fechaDesde = versionLey.fechaDesde != null ? moment(versionLey.fechaDesde) : null;
            });
        }
        return res;
    }
}
