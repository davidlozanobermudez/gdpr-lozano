import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISubscripcion } from 'app/shared/model/subscripcion.model';
import { AccountService } from 'app/core';
import { SubscripcionService } from './subscripcion.service';

@Component({
    selector: 'jhi-subscripcion',
    templateUrl: './subscripcion.component.html'
})
export class SubscripcionComponent implements OnInit, OnDestroy {
    subscripcions: ISubscripcion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected subscripcionService: SubscripcionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.subscripcionService
            .query()
            .pipe(
                filter((res: HttpResponse<ISubscripcion[]>) => res.ok),
                map((res: HttpResponse<ISubscripcion[]>) => res.body)
            )
            .subscribe(
                (res: ISubscripcion[]) => {
                    this.subscripcions = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSubscripcions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISubscripcion) {
        return item.id;
    }

    registerChangeInSubscripcions() {
        this.eventSubscriber = this.eventManager.subscribe('subscripcionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
