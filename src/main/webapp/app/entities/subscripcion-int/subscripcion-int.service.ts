import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISubscripcionInt } from 'app/shared/model/subscripcion-int.model';

type EntityResponseType = HttpResponse<ISubscripcionInt>;
type EntityArrayResponseType = HttpResponse<ISubscripcionInt[]>;

@Injectable({ providedIn: 'root' })
export class SubscripcionIntService {
    public resourceUrl = SERVER_API_URL + 'api/subscripcion-ints';

    constructor(protected http: HttpClient) {}

    create(subscripcionInt: ISubscripcionInt): Observable<EntityResponseType> {
        return this.http.post<ISubscripcionInt>(this.resourceUrl, subscripcionInt, { observe: 'response' });
    }

    update(subscripcionInt: ISubscripcionInt): Observable<EntityResponseType> {
        return this.http.put<ISubscripcionInt>(this.resourceUrl, subscripcionInt, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISubscripcionInt>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISubscripcionInt[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
