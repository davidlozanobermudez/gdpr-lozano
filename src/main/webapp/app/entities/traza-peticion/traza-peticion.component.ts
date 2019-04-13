import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITrazaPeticion } from 'app/shared/model/traza-peticion.model';
import { AccountService } from 'app/core';
import { TrazaPeticionService } from './traza-peticion.service';

@Component({
    selector: 'jhi-traza-peticion',
    templateUrl: './traza-peticion.component.html'
})
export class TrazaPeticionComponent implements OnInit, OnDestroy {
    trazaPeticions: ITrazaPeticion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected trazaPeticionService: TrazaPeticionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.trazaPeticionService
            .query()
            .pipe(
                filter((res: HttpResponse<ITrazaPeticion[]>) => res.ok),
                map((res: HttpResponse<ITrazaPeticion[]>) => res.body)
            )
            .subscribe(
                (res: ITrazaPeticion[]) => {
                    this.trazaPeticions = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTrazaPeticions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITrazaPeticion) {
        return item.id;
    }

    registerChangeInTrazaPeticions() {
        this.eventSubscriber = this.eventManager.subscribe('trazaPeticionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
