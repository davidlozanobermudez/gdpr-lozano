import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISistema } from 'app/shared/model/sistema.model';
import { AccountService } from 'app/core';
import { SistemaService } from './sistema.service';

@Component({
    selector: 'jhi-sistema',
    templateUrl: './sistema.component.html'
})
export class SistemaComponent implements OnInit, OnDestroy {
    sistemas: ISistema[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected sistemaService: SistemaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.sistemaService
            .query()
            .pipe(
                filter((res: HttpResponse<ISistema[]>) => res.ok),
                map((res: HttpResponse<ISistema[]>) => res.body)
            )
            .subscribe(
                (res: ISistema[]) => {
                    this.sistemas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSistemas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISistema) {
        return item.id;
    }

    registerChangeInSistemas() {
        this.eventSubscriber = this.eventManager.subscribe('sistemaListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
