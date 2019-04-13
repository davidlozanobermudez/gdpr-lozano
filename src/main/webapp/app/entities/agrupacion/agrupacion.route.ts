import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Agrupacion } from 'app/shared/model/agrupacion.model';
import { AgrupacionService } from './agrupacion.service';
import { AgrupacionComponent } from './agrupacion.component';
import { AgrupacionDetailComponent } from './agrupacion-detail.component';
import { AgrupacionUpdateComponent } from './agrupacion-update.component';
import { AgrupacionDeletePopupComponent } from './agrupacion-delete-dialog.component';
import { IAgrupacion } from 'app/shared/model/agrupacion.model';

@Injectable({ providedIn: 'root' })
export class AgrupacionResolve implements Resolve<IAgrupacion> {
    constructor(private service: AgrupacionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAgrupacion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Agrupacion>) => response.ok),
                map((agrupacion: HttpResponse<Agrupacion>) => agrupacion.body)
            );
        }
        return of(new Agrupacion());
    }
}

export const agrupacionRoute: Routes = [
    {
        path: '',
        component: AgrupacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.agrupacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AgrupacionDetailComponent,
        resolve: {
            agrupacion: AgrupacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.agrupacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AgrupacionUpdateComponent,
        resolve: {
            agrupacion: AgrupacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.agrupacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AgrupacionUpdateComponent,
        resolve: {
            agrupacion: AgrupacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.agrupacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agrupacionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AgrupacionDeletePopupComponent,
        resolve: {
            agrupacion: AgrupacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.agrupacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
