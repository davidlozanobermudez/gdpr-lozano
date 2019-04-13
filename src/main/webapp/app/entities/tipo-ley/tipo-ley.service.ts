import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoLey } from 'app/shared/model/tipo-ley.model';

type EntityResponseType = HttpResponse<ITipoLey>;
type EntityArrayResponseType = HttpResponse<ITipoLey[]>;

@Injectable({ providedIn: 'root' })
export class TipoLeyService {
    public resourceUrl = SERVER_API_URL + 'api/tipolies';

    constructor(protected http: HttpClient) {}

    create(tipoLey: ITipoLey): Observable<EntityResponseType> {
        return this.http.post<ITipoLey>(this.resourceUrl, tipoLey, { observe: 'response' });
    }

    update(tipoLey: ITipoLey): Observable<EntityResponseType> {
        return this.http.put<ITipoLey>(this.resourceUrl, tipoLey, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITipoLey>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoLey[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
