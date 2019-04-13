import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVersionLeyInt } from 'app/shared/model/version-ley-int.model';

type EntityResponseType = HttpResponse<IVersionLeyInt>;
type EntityArrayResponseType = HttpResponse<IVersionLeyInt[]>;

@Injectable({ providedIn: 'root' })
export class VersionLeyIntService {
    public resourceUrl = SERVER_API_URL + 'api/version-ley-ints';

    constructor(protected http: HttpClient) {}

    create(versionLeyInt: IVersionLeyInt): Observable<EntityResponseType> {
        return this.http.post<IVersionLeyInt>(this.resourceUrl, versionLeyInt, { observe: 'response' });
    }

    update(versionLeyInt: IVersionLeyInt): Observable<EntityResponseType> {
        return this.http.put<IVersionLeyInt>(this.resourceUrl, versionLeyInt, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVersionLeyInt>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVersionLeyInt[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
