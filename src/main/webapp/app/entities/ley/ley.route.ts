import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ley } from 'app/shared/model/ley.model';
import { LeyService } from './ley.service';
import { LeyComponent } from './ley.component';
import { LeyDetailComponent } from './ley-detail.component';
import { LeyUpdateComponent } from './ley-update.component';
import { LeyDeletePopupComponent } from './ley-delete-dialog.component';
import { ILey } from 'app/shared/model/ley.model';

@Injectable({ providedIn: 'root' })
export class LeyResolve implements Resolve<ILey> {
    constructor(private service: LeyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILey> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Ley>) => response.ok),
                map((ley: HttpResponse<Ley>) => ley.body)
            );
        }
        return of(new Ley());
    }
}

export const leyRoute: Routes = [
    {
        path: '',
        component: LeyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.ley.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: LeyDetailComponent,
        resolve: {
            ley: LeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.ley.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: LeyUpdateComponent,
        resolve: {
            ley: LeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.ley.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: LeyUpdateComponent,
        resolve: {
            ley: LeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.ley.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const leyPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: LeyDeletePopupComponent,
        resolve: {
            ley: LeyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.ley.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
