import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VersionLeyInt } from 'app/shared/model/version-ley-int.model';
import { VersionLeyIntService } from './version-ley-int.service';
import { VersionLeyIntComponent } from './version-ley-int.component';
import { VersionLeyIntDetailComponent } from './version-ley-int-detail.component';
import { VersionLeyIntUpdateComponent } from './version-ley-int-update.component';
import { VersionLeyIntDeletePopupComponent } from './version-ley-int-delete-dialog.component';
import { IVersionLeyInt } from 'app/shared/model/version-ley-int.model';

@Injectable({ providedIn: 'root' })
export class VersionLeyIntResolve implements Resolve<IVersionLeyInt> {
    constructor(private service: VersionLeyIntService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVersionLeyInt> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<VersionLeyInt>) => response.ok),
                map((versionLeyInt: HttpResponse<VersionLeyInt>) => versionLeyInt.body)
            );
        }
        return of(new VersionLeyInt());
    }
}

export const versionLeyIntRoute: Routes = [
    {
        path: '',
        component: VersionLeyIntComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.versionLeyInt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: VersionLeyIntDetailComponent,
        resolve: {
            versionLeyInt: VersionLeyIntResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.versionLeyInt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: VersionLeyIntUpdateComponent,
        resolve: {
            versionLeyInt: VersionLeyIntResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.versionLeyInt.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: VersionLeyIntUpdateComponent,
        resolve: {
            versionLeyInt: VersionLeyIntResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.versionLeyInt.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const versionLeyIntPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: VersionLeyIntDeletePopupComponent,
        resolve: {
            versionLeyInt: VersionLeyIntResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.versionLeyInt.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
