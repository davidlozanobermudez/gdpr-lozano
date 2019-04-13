import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAgrupacion } from 'app/shared/model/agrupacion.model';
import { AccountService } from 'app/core';
import { AgrupacionService } from './agrupacion.service';

@Component({
    selector: 'jhi-agrupacion',
    templateUrl: './agrupacion.component.html'
})
export class AgrupacionComponent implements OnInit, OnDestroy {
    agrupacions: IAgrupacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected agrupacionService: AgrupacionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.agrupacionService
            .query()
            .pipe(
                filter((res: HttpResponse<IAgrupacion[]>) => res.ok),
                map((res: HttpResponse<IAgrupacion[]>) => res.body)
            )
            .subscribe(
                (res: IAgrupacion[]) => {
                    this.agrupacions = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAgrupacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAgrupacion) {
        return item.id;
    }

    registerChangeInAgrupacions() {
        this.eventSubscriber = this.eventManager.subscribe('agrupacionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
