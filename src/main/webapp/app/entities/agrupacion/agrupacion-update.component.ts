import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAgrupacion } from 'app/shared/model/agrupacion.model';
import { AgrupacionService } from './agrupacion.service';
import { ILey } from 'app/shared/model/ley.model';
import { LeyService } from 'app/entities/ley';
import { IOperacion } from 'app/shared/model/operacion.model';
import { OperacionService } from 'app/entities/operacion';
import { IContacto } from 'app/shared/model/contacto.model';
import { ContactoService } from 'app/entities/contacto';

@Component({
    selector: 'jhi-agrupacion-update',
    templateUrl: './agrupacion-update.component.html'
})
export class AgrupacionUpdateComponent implements OnInit {
    agrupacion: IAgrupacion;
    isSaving: boolean;

    leys: ILey[];

    operacions: IOperacion[];

    contactos: IContacto[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected agrupacionService: AgrupacionService,
        protected leyService: LeyService,
        protected operacionService: OperacionService,
        protected contactoService: ContactoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ agrupacion }) => {
            this.agrupacion = agrupacion;
        });
        this.leyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ILey[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILey[]>) => response.body)
            )
            .subscribe((res: ILey[]) => (this.leys = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.operacionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IOperacion[]>) => mayBeOk.ok),
                map((response: HttpResponse<IOperacion[]>) => response.body)
            )
            .subscribe((res: IOperacion[]) => (this.operacions = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.contactoService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IContacto[]>) => mayBeOk.ok),
                map((response: HttpResponse<IContacto[]>) => response.body)
            )
            .subscribe((res: IContacto[]) => (this.contactos = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.agrupacion.id !== undefined) {
            this.subscribeToSaveResponse(this.agrupacionService.update(this.agrupacion));
        } else {
            this.subscribeToSaveResponse(this.agrupacionService.create(this.agrupacion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgrupacion>>) {
        result.subscribe((res: HttpResponse<IAgrupacion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOperacionById(index: number, item: IOperacion) {
        return item.id;
    }

    trackContactoById(index: number, item: IContacto) {
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
