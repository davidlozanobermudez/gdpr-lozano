import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TrazaPeticion } from 'app/shared/model/traza-peticion.model';
import { TrazaPeticionService } from './traza-peticion.service';
import { TrazaPeticionComponent } from './traza-peticion.component';
import { TrazaPeticionDetailComponent } from './traza-peticion-detail.component';
import { TrazaPeticionUpdateComponent } from './traza-peticion-update.component';
import { TrazaPeticionDeletePopupComponent } from './traza-peticion-delete-dialog.component';
import { ITrazaPeticion } from 'app/shared/model/traza-peticion.model';

@Injectable({ providedIn: 'root' })
export class TrazaPeticionResolve implements Resolve<ITrazaPeticion> {
    constructor(private service: TrazaPeticionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITrazaPeticion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TrazaPeticion>) => response.ok),
                map((trazaPeticion: HttpResponse<TrazaPeticion>) => trazaPeticion.body)
            );
        }
        return of(new TrazaPeticion());
    }
}

export const trazaPeticionRoute: Routes = [
    {
        path: '',
        component: TrazaPeticionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.trazaPeticion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TrazaPeticionDetailComponent,
        resolve: {
            trazaPeticion: TrazaPeticionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.trazaPeticion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TrazaPeticionUpdateComponent,
        resolve: {
            trazaPeticion: TrazaPeticionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.trazaPeticion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TrazaPeticionUpdateComponent,
        resolve: {
            trazaPeticion: TrazaPeticionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.trazaPeticion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trazaPeticionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TrazaPeticionDeletePopupComponent,
        resolve: {
            trazaPeticion: TrazaPeticionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.trazaPeticion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
