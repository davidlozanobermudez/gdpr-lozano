import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVersionLeyInt } from 'app/shared/model/version-ley-int.model';
import { AccountService } from 'app/core';
import { VersionLeyIntService } from './version-ley-int.service';

@Component({
    selector: 'jhi-version-ley-int',
    templateUrl: './version-ley-int.component.html'
})
export class VersionLeyIntComponent implements OnInit, OnDestroy {
    versionLeyInts: IVersionLeyInt[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected versionLeyIntService: VersionLeyIntService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.versionLeyIntService
            .query()
            .pipe(
                filter((res: HttpResponse<IVersionLeyInt[]>) => res.ok),
                map((res: HttpResponse<IVersionLeyInt[]>) => res.body)
            )
            .subscribe(
                (res: IVersionLeyInt[]) => {
                    this.versionLeyInts = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVersionLeyInts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVersionLeyInt) {
        return item.id;
    }

    registerChangeInVersionLeyInts() {
        this.eventSubscriber = this.eventManager.subscribe('versionLeyIntListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
