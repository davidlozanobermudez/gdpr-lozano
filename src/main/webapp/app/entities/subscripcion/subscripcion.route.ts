import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Subscripcion } from 'app/shared/model/subscripcion.model';
import { SubscripcionService } from './subscripcion.service';
import { SubscripcionComponent } from './subscripcion.component';
import { SubscripcionDetailComponent } from './subscripcion-detail.component';
import { SubscripcionUpdateComponent } from './subscripcion-update.component';
import { SubscripcionDeletePopupComponent } from './subscripcion-delete-dialog.component';
import { ISubscripcion } from 'app/shared/model/subscripcion.model';

@Injectable({ providedIn: 'root' })
export class SubscripcionResolve implements Resolve<ISubscripcion> {
    constructor(private service: SubscripcionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISubscripcion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Subscripcion>) => response.ok),
                map((subscripcion: HttpResponse<Subscripcion>) => subscripcion.body)
            );
        }
        return of(new Subscripcion());
    }
}

export const subscripcionRoute: Routes = [
    {
        path: '',
        component: SubscripcionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.subscripcion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SubscripcionDetailComponent,
        resolve: {
            subscripcion: SubscripcionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.subscripcion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SubscripcionUpdateComponent,
        resolve: {
            subscripcion: SubscripcionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.subscripcion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SubscripcionUpdateComponent,
        resolve: {
            subscripcion: SubscripcionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.subscripcion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subscripcionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SubscripcionDeletePopupComponent,
        resolve: {
            subscripcion: SubscripcionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.subscripcion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
