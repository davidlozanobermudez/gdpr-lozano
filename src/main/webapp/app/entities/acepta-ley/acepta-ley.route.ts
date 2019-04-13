import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AceptaLey } from 'app/shared/model/acepta-ley.model';
import { AceptaLeyService } from './acepta-ley.service';
import { AceptaLeyComponent } from './acepta-ley.component';
import { AceptaLeyDetailComponent } from './acepta-ley-detail.component';
import { AceptaLeyUpdateComponent } from './acepta-ley-update.component';
import { AceptaLeyDeletePopupComponent } from './acepta-ley-delete-dialog.component';
import { IAceptaLey } from 'app/shared/model/acepta-ley.model';

@Injectable({ providedIn: 'root' })
export class AceptaLeyResolve implements Resolve<IAceptaLey> {
    constructor(private service: AceptaLeyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAceptaLey> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AceptaLey>) => response.ok),
                map((aceptaLey: HttpResponse<AceptaLey>) => aceptaLey.body)
            );
        }
        return of(new AceptaLey());
    }
}

export const aceptaLeyRoute: Routes = [
    {
        path: '',
        component: AceptaLeyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.aceptaLey.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AceptaLeyDetailComponent,
        resolve: {
            aceptaLey: AceptaLeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.aceptaLey.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AceptaLeyUpdateComponent,
        resolve: {
            aceptaLey: AceptaLeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.aceptaLey.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AceptaLeyUpdateComponent,
        resolve: {
            aceptaLey: AceptaLeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.aceptaLey.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const aceptaLeyPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AceptaLeyDeletePopupComponent,
        resolve: {
            aceptaLey: AceptaLeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.aceptaLey.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
