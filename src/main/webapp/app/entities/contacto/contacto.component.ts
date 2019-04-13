import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IContacto } from 'app/shared/model/contacto.model';
import { AccountService } from 'app/core';
import { ContactoService } from './contacto.service';

@Component({
    selector: 'jhi-contacto',
    templateUrl: './contacto.component.html'
})
export class ContactoComponent implements OnInit, OnDestroy {
    contactos: IContacto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected contactoService: ContactoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.contactoService
            .query()
            .pipe(
                filter((res: HttpResponse<IContacto[]>) => res.ok),
                map((res: HttpResponse<IContacto[]>) => res.body)
            )
            .subscribe(
                (res: IContacto[]) => {
                    this.contactos = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInContactos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContacto) {
        return item.id;
    }

    registerChangeInContactos() {
        this.eventSubscriber = this.eventManager.subscribe('contactoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
