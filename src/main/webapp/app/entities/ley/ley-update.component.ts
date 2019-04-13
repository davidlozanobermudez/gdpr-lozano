import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILey } from 'app/shared/model/ley.model';
import { LeyService } from './ley.service';
import { ITipoLey } from 'app/shared/model/tipo-ley.model';
import { TipoLeyService } from 'app/entities/tipo-ley';
import { IAgrupacion } from 'app/shared/model/agrupacion.model';
import { AgrupacionService } from 'app/entities/agrupacion';

@Component({
    selector: 'jhi-ley-update',
    templateUrl: './ley-update.component.html'
})
export class LeyUpdateComponent implements OnInit {
    ley: ILey;
    isSaving: boolean;

    tipolies: ITipoLey[];

    agrupacions: IAgrupacion[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected leyService: LeyService,
        protected tipoLeyService: TipoLeyService,
        protected agrupacionService: AgrupacionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ley }) => {
            this.ley = ley;
        });
        this.tipoLeyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITipoLey[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITipoLey[]>) => response.body)
            )
            .subscribe((res: ITipoLey[]) => (this.tipolies = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.agrupacionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IAgrupacion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAgrupacion[]>) => response.body)
            )
            .subscribe((res: IAgrupacion[]) => (this.agrupacions = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ley.id !== undefined) {
            this.subscribeToSaveResponse(this.leyService.update(this.ley));
        } else {
            this.subscribeToSaveResponse(this.leyService.create(this.ley));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILey>>) {
        result.subscribe((res: HttpResponse<ILey>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTipoLeyById(index: number, item: ITipoLey) {
        return item.id;
    }

    trackAgrupacionById(index: number, item: IAgrupacion) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
