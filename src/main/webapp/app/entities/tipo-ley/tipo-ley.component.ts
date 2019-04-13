import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoLey } from 'app/shared/model/tipo-ley.model';
import { AccountService } from 'app/core';
import { TipoLeyService } from './tipo-ley.service';

@Component({
    selector: 'jhi-tipo-ley',
    templateUrl: './tipo-ley.component.html'
})
export class TipoLeyComponent implements OnInit, OnDestroy {
    tipolies: ITipoLey[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected tipoLeyService: TipoLeyService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.tipoLeyService
            .query()
            .pipe(
                filter((res: HttpResponse<ITipoLey[]>) => res.ok),
                map((res: HttpResponse<ITipoLey[]>) => res.body)
            )
            .subscribe(
                (res: ITipoLey[]) => {
                    this.tipolies = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTipolies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITipoLey) {
        return item.id;
    }

    registerChangeInTipolies() {
        this.eventSubscriber = this.eventManager.subscribe('tipoLeyListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
