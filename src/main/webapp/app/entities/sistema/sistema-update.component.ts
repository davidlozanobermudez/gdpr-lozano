import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISistema } from 'app/shared/model/sistema.model';
import { SistemaService } from './sistema.service';
import { IOperacion } from 'app/shared/model/operacion.model';
import { OperacionService } from 'app/entities/operacion';

@Component({
    selector: 'jhi-sistema-update',
    templateUrl: './sistema-update.component.html'
})
export class SistemaUpdateComponent implements OnInit {
    sistema: ISistema;
    isSaving: boolean;

    operacions: IOperacion[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected sistemaService: SistemaService,
        protected operacionService: OperacionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sistema }) => {
            this.sistema = sistema;
        });
        this.operacionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IOperacion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IOperacion[]>) => response.body)
            )
            .subscribe((res: IOperacion[]) => (this.operacions = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sistema.id !== undefined) {
            this.subscribeToSaveResponse(this.sistemaService.update(this.sistema));
        } else {
            this.subscribeToSaveResponse(this.sistemaService.create(this.sistema));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISistema>>) {
        result.subscribe((res: HttpResponse<ISistema>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOperacionById(index: number, item: IOperacion) {
        return item.id;
    }
}
