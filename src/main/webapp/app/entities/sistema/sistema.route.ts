import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Sistema } from 'app/shared/model/sistema.model';
import { SistemaService } from './sistema.service';
import { SistemaComponent } from './sistema.component';
import { SistemaDetailComponent } from './sistema-detail.component';
import { SistemaUpdateComponent } from './sistema-update.component';
import { SistemaDeletePopupComponent } from './sistema-delete-dialog.component';
import { ISistema } from 'app/shared/model/sistema.model';

@Injectable({ providedIn: 'root' })
export class SistemaResolve implements Resolve<ISistema> {
    constructor(private service: SistemaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISistema> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Sistema>) => response.ok),
                map((sistema: HttpResponse<Sistema>) => sistema.body)
            );
        }
        return of(new Sistema());
    }
}

export const sistemaRoute: Routes = [
    {
        path: '',
        component: SistemaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.sistema.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SistemaDetailComponent,
        resolve: {
            sistema: SistemaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.sistema.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SistemaUpdateComponent,
        resolve: {
            sistema: SistemaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.sistema.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SistemaUpdateComponent,
        resolve: {
            sistema: SistemaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.sistema.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sistemaPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SistemaDeletePopupComponent,
        resolve: {
            sistema: SistemaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.sistema.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
