import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISubscripcionInt } from 'app/shared/model/subscripcion-int.model';
import { AccountService } from 'app/core';
import { SubscripcionIntService } from './subscripcion-int.service';

@Component({
    selector: 'jhi-subscripcion-int',
    templateUrl: './subscripcion-int.component.html'
})
export class SubscripcionIntComponent implements OnInit, OnDestroy {
    subscripcionInts: ISubscripcionInt[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected subscripcionIntService: SubscripcionIntService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.subscripcionIntService
            .query()
            .pipe(
                filter((res: HttpResponse<ISubscripcionInt[]>) => res.ok),
                map((res: HttpResponse<ISubscripcionInt[]>) => res.body)
            )
            .subscribe(
                (res: ISubscripcionInt[]) => {
                    this.subscripcionInts = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSubscripcionInts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISubscripcionInt) {
        return item.id;
    }

    registerChangeInSubscripcionInts() {
        this.eventSubscriber = this.eventManager.subscribe('subscripcionIntListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
