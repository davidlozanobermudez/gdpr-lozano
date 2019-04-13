import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SubscripcionInt } from 'app/shared/model/subscripcion-int.model';
import { SubscripcionIntService } from './subscripcion-int.service';
import { SubscripcionIntComponent } from './subscripcion-int.component';
import { SubscripcionIntDetailComponent } from './subscripcion-int-detail.component';
import { SubscripcionIntUpdateComponent } from './subscripcion-int-update.component';
import { SubscripcionIntDeletePopupComponent } from './subscripcion-int-delete-dialog.component';
import { ISubscripcionInt } from 'app/shared/model/subscripcion-int.model';

@Injectable({ providedIn: 'root' })
export class SubscripcionIntResolve implements Resolve<ISubscripcionInt> {
    constructor(private service: SubscripcionIntService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISubscripcionInt> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SubscripcionInt>) => response.ok),
                map((subscripcionInt: HttpResponse<SubscripcionInt>) => subscripcionInt.body)
            );
        }
        return of(new SubscripcionInt());
    }
}

export const subscripcionIntRoute: Routes = [
    {
        path: '',
        component: SubscripcionIntComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.subscripcionInt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SubscripcionIntDetailComponent,
        resolve: {
            subscripcionInt: SubscripcionIntResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.subscripcionInt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SubscripcionIntUpdateComponent,
        resolve: {
            subscripcionInt: SubscripcionIntResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.subscripcionInt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SubscripcionIntUpdateComponent,
        resolve: {
            subscripcionInt: SubscripcionIntResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.subscripcionInt.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subscripcionIntPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SubscripcionIntDeletePopupComponent,
        resolve: {
            subscripcionInt: SubscripcionIntResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.subscripcionInt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
