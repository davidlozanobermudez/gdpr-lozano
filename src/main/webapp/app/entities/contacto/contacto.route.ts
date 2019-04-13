import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Contacto } from 'app/shared/model/contacto.model';
import { ContactoService } from './contacto.service';
import { ContactoComponent } from './contacto.component';
import { ContactoDetailComponent } from './contacto-detail.component';
import { ContactoUpdateComponent } from './contacto-update.component';
import { ContactoDeletePopupComponent } from './contacto-delete-dialog.component';
import { IContacto } from 'app/shared/model/contacto.model';

@Injectable({ providedIn: 'root' })
export class ContactoResolve implements Resolve<IContacto> {
    constructor(private service: ContactoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContacto> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Contacto>) => response.ok),
                map((contacto: HttpResponse<Contacto>) => contacto.body)
            );
        }
        return of(new Contacto());
    }
}

export const contactoRoute: Routes = [
    {
        path: '',
        component: ContactoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.contacto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ContactoDetailComponent,
        resolve: {
            contacto: ContactoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.contacto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ContactoUpdateComponent,
        resolve: {
            contacto: ContactoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.contacto.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ContactoUpdateComponent,
        resolve: {
            contacto: ContactoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.contacto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactoPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ContactoDeletePopupComponent,
        resolve: {
            contacto: ContactoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.contacto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
