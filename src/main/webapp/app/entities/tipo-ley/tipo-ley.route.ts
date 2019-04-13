import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoLey } from 'app/shared/model/tipo-ley.model';
import { TipoLeyService } from './tipo-ley.service';
import { TipoLeyComponent } from './tipo-ley.component';
import { TipoLeyDetailComponent } from './tipo-ley-detail.component';
import { TipoLeyUpdateComponent } from './tipo-ley-update.component';
import { TipoLeyDeletePopupComponent } from './tipo-ley-delete-dialog.component';
import { ITipoLey } from 'app/shared/model/tipo-ley.model';

@Injectable({ providedIn: 'root' })
export class TipoLeyResolve implements Resolve<ITipoLey> {
    constructor(private service: TipoLeyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoLey> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TipoLey>) => response.ok),
                map((tipoLey: HttpResponse<TipoLey>) => tipoLey.body)
            );
        }
        return of(new TipoLey());
    }
}

export const tipoLeyRoute: Routes = [
    {
        path: '',
        component: TipoLeyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.tipoLey.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TipoLeyDetailComponent,
        resolve: {
            tipoLey: TipoLeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.tipoLey.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TipoLeyUpdateComponent,
        resolve: {
            tipoLey: TipoLeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.tipoLey.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TipoLeyUpdateComponent,
        resolve: {
            tipoLey: TipoLeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.tipoLey.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoLeyPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TipoLeyDeletePopupComponent,
        resolve: {
            tipoLey: TipoLeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.tipoLey.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
