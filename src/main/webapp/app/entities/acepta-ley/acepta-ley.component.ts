import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAceptaLey } from 'app/shared/model/acepta-ley.model';
import { AccountService } from 'app/core';
import { AceptaLeyService } from './acepta-ley.service';

@Component({
    selector: 'jhi-acepta-ley',
    templateUrl: './acepta-ley.component.html'
})
export class AceptaLeyComponent implements OnInit, OnDestroy {
    aceptaLeys: IAceptaLey[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected aceptaLeyService: AceptaLeyService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.aceptaLeyService
            .query()
            .pipe(
                filter((res: HttpResponse<IAceptaLey[]>) => res.ok),
                map((res: HttpResponse<IAceptaLey[]>) => res.body)
            )
            .subscribe(
                (res: IAceptaLey[]) => {
                    this.aceptaLeys = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAceptaLeys();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAceptaLey) {
        return item.id;
    }

    registerChangeInAceptaLeys() {
        this.eventSubscriber = this.eventManager.subscribe('aceptaLeyListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
