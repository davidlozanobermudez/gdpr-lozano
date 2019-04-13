import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILey } from 'app/shared/model/ley.model';

type EntityResponseType = HttpResponse<ILey>;
type EntityArrayResponseType = HttpResponse<ILey[]>;

@Injectable({ providedIn: 'root' })
export class LeyService {
    public resourceUrl = SERVER_API_URL + 'api/leys';

    constructor(protected http: HttpClient) {}

    create(ley: ILey): Observable<EntityResponseType> {
        return this.http.post<ILey>(this.resourceUrl, ley, { observe: 'response' });
    }

    update(ley: ILey): Observable<EntityResponseType> {
        return this.http.put<ILey>(this.resourceUrl, ley, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILey>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILey[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
