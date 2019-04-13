import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IVersionLeyInt } from 'app/shared/model/version-ley-int.model';
import { VersionLeyIntService } from './version-ley-int.service';
import { IVersionLey } from 'app/shared/model/version-ley.model';
import { VersionLeyService } from 'app/entities/version-ley';
import { ILanguage } from 'app/shared/model/language.model';
import { LanguageService } from 'app/entities/language';

@Component({
    selector: 'jhi-version-ley-int-update',
    templateUrl: './version-ley-int-update.component.html'
})
export class VersionLeyIntUpdateComponent implements OnInit {
    versionLeyInt: IVersionLeyInt;
    isSaving: boolean;

    versionleys: IVersionLey[];

    languages: ILanguage[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected versionLeyIntService: VersionLeyIntService,
        protected versionLeyService: VersionLeyService,
        protected languageService: LanguageService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ versionLeyInt }) => {
            this.versionLeyInt = versionLeyInt;
        });
        this.versionLeyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IVersionLey[]>) => mayBeOk.ok),
                map((response: HttpResponse<IVersionLey[]>) => response.body)
            )
            .subscribe((res: IVersionLey[]) => (this.versionleys = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.languageService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ILanguage[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILanguage[]>) => response.body)
            )
            .subscribe((res: ILanguage[]) => (this.languages = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.versionLeyInt.id !== undefined) {
            this.subscribeToSaveResponse(this.versionLeyIntService.update(this.versionLeyInt));
        } else {
            this.subscribeToSaveResponse(this.versionLeyIntService.create(this.versionLeyInt));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVersionLeyInt>>) {
        result.subscribe((res: HttpResponse<IVersionLeyInt>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackVersionLeyById(index: number, item: IVersionLey) {
        return item.id;
    }

    trackLanguageById(index: number, item: ILanguage) {
        return item.id;
    }
}
