import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISubscripcionInt } from 'app/shared/model/subscripcion-int.model';
import { SubscripcionIntService } from './subscripcion-int.service';
import { ISubscripcion } from 'app/shared/model/subscripcion.model';
import { SubscripcionService } from 'app/entities/subscripcion';
import { ILanguage } from 'app/shared/model/language.model';
import { LanguageService } from 'app/entities/language';

@Component({
    selector: 'jhi-subscripcion-int-update',
    templateUrl: './subscripcion-int-update.component.html'
})
export class SubscripcionIntUpdateComponent implements OnInit {
    subscripcionInt: ISubscripcionInt;
    isSaving: boolean;

    subscripcions: ISubscripcion[];

    languages: ILanguage[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected subscripcionIntService: SubscripcionIntService,
        protected subscripcionService: SubscripcionService,
        protected languageService: LanguageService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subscripcionInt }) => {
            this.subscripcionInt = subscripcionInt;
        });
        this.subscripcionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISubscripcion[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISubscripcion[]>) => response.body)
            )
            .subscribe((res: ISubscripcion[]) => (this.subscripcions = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.subscripcionInt.id !== undefined) {
            this.subscribeToSaveResponse(this.subscripcionIntService.update(this.subscripcionInt));
        } else {
            this.subscribeToSaveResponse(this.subscripcionIntService.create(this.subscripcionInt));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubscripcionInt>>) {
        result.subscribe((res: HttpResponse<ISubscripcionInt>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSubscripcionById(index: number, item: ISubscripcion) {
        return item.id;
    }

    trackLanguageById(index: number, item: ILanguage) {
        return item.id;
    }
}
