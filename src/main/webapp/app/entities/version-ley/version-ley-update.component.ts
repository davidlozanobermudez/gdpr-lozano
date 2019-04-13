import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IVersionLey } from 'app/shared/model/version-ley.model';
import { VersionLeyService } from './version-ley.service';
import { ILey } from 'app/shared/model/ley.model';
import { LeyService } from 'app/entities/ley';

@Component({
    selector: 'jhi-version-ley-update',
    templateUrl: './version-ley-update.component.html'
})
export class VersionLeyUpdateComponent implements OnInit {
    versionLey: IVersionLey;
    isSaving: boolean;

    leys: ILey[];
    fechaDesdeDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected versionLeyService: VersionLeyService,
        protected leyService: LeyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ versionLey }) => {
            this.versionLey = versionLey;
        });
        this.leyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ILey[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILey[]>) => response.body)
            )
            .subscribe((res: ILey[]) => (this.leys = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.versionLey.id !== undefined) {
            this.subscribeToSaveResponse(this.versionLeyService.update(this.versionLey));
        } else {
            this.subscribeToSaveResponse(this.versionLeyService.create(this.versionLey));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVersionLey>>) {
        result.subscribe((res: HttpResponse<IVersionLey>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLeyById(index: number, item: ILey) {
        return item.id;
    }
}
