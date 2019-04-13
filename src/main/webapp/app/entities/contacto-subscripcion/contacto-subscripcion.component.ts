import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IContactoSubscripcion } from 'app/shared/model/contacto-subscripcion.model';
import { AccountService } from 'app/core';
import { ContactoSubscripcionService } from './contacto-subscripcion.service';

@Component({
    selector: 'jhi-contacto-subscripcion',
    templateUrl: './contacto-subscripcion.component.html'
})
export class ContactoSubscripcionComponent implements OnInit, OnDestroy {
    contactoSubscripcions: IContactoSubscripcion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected contactoSubscripcionService: ContactoSubscripcionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.contactoSubscripcionService
            .query()
            .pipe(
                filter((res: HttpResponse<IContactoSubscripcion[]>) => res.ok),
                map((res: HttpResponse<IContactoSubscripcion[]>) => res.body)
            )
            .subscribe(
                (res: IContactoSubscripcion[]) => {
                    this.contactoSubscripcions = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInContactoSubscripcions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContactoSubscripcion) {
        return item.id;
    }

    registerChangeInContactoSubscripcions() {
        this.eventSubscriber = this.eventManager.subscribe('contactoSubscripcionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
