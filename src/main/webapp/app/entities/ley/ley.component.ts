import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILey } from 'app/shared/model/ley.model';
import { AccountService } from 'app/core';
import { LeyService } from './ley.service';

@Component({
    selector: 'jhi-ley',
    templateUrl: './ley.component.html'
})
export class LeyComponent implements OnInit, OnDestroy {
    leys: ILey[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected leyService: LeyService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.leyService
            .query()
            .pipe(
                filter((res: HttpResponse<ILey[]>) => res.ok),
                map((res: HttpResponse<ILey[]>) => res.body)
            )
            .subscribe(
                (res: ILey[]) => {
                    this.leys = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLeys();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILey) {
        return item.id;
    }

    registerChangeInLeys() {
        this.eventSubscriber = this.eventManager.subscribe('leyListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
