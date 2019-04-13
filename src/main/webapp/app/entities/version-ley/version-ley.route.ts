import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { VersionLey } from 'app/shared/model/version-ley.model';
import { VersionLeyService } from './version-ley.service';
import { VersionLeyComponent } from './version-ley.component';
import { VersionLeyDetailComponent } from './version-ley-detail.component';
import { VersionLeyUpdateComponent } from './version-ley-update.component';
import { VersionLeyDeletePopupComponent } from './version-ley-delete-dialog.component';
import { IVersionLey } from 'app/shared/model/version-ley.model';

@Injectable({ providedIn: 'root' })
export class VersionLeyResolve implements Resolve<IVersionLey> {
    constructor(private service: VersionLeyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVersionLey> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<VersionLey>) => response.ok),
                map((versionLey: HttpResponse<VersionLey>) => versionLey.body)
            );
        }
        return of(new VersionLey());
    }
}

export const versionLeyRoute: Routes = [
    {
        path: '',
        component: VersionLeyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.versionLey.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: VersionLeyDetailComponent,
        resolve: {
            versionLey: VersionLeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.versionLey.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: VersionLeyUpdateComponent,
        resolve: {
            versionLey: VersionLeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.versionLey.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: VersionLeyUpdateComponent,
        resolve: {
            versionLey: VersionLeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.versionLey.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const versionLeyPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: VersionLeyDeletePopupComponent,
        resolve: {
            versionLey: VersionLeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.versionLey.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
