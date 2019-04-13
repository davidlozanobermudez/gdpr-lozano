import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ContactoSubscripcion } from 'app/shared/model/contacto-subscripcion.model';
import { ContactoSubscripcionService } from './contacto-subscripcion.service';
import { ContactoSubscripcionComponent } from './contacto-subscripcion.component';
import { ContactoSubscripcionDetailComponent } from './contacto-subscripcion-detail.component';
import { ContactoSubscripcionUpdateComponent } from './contacto-subscripcion-update.component';
import { ContactoSubscripcionDeletePopupComponent } from './contacto-subscripcion-delete-dialog.component';
import { IContactoSubscripcion } from 'app/shared/model/contacto-subscripcion.model';

@Injectable({ providedIn: 'root' })
export class ContactoSubscripcionResolve implements Resolve<IContactoSubscripcion> {
    constructor(private service: ContactoSubscripcionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContactoSubscripcion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ContactoSubscripcion>) => response.ok),
                map((contactoSubscripcion: HttpResponse<ContactoSubscripcion>) => contactoSubscripcion.body)
            );
        }
        return of(new ContactoSubscripcion());
    }
}

export const contactoSubscripcionRoute: Routes = [
    {
        path: '',
        component: ContactoSubscripcionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.contactoSubscripcion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ContactoSubscripcionDetailComponent,
        resolve: {
            contactoSubscripcion: ContactoSubscripcionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.contactoSubscripcion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ContactoSubscripcionUpdateComponent,
        resolve: {
            contactoSubscripcion: ContactoSubscripcionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.contactoSubscripcion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ContactoSubscripcionUpdateComponent,
        resolve: {
            contactoSubscripcion: ContactoSubscripcionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.contactoSubscripcion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactoSubscripcionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ContactoSubscripcionDeletePopupComponent,
        resolve: {
            contactoSubscripcion: ContactoSubscripcionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gdprLozanoApp.contactoSubscripcion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
