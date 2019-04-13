import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IContacto } from 'app/shared/model/contacto.model';
import { ContactoService } from './contacto.service';
import { IAgrupacion } from 'app/shared/model/agrupacion.model';
import { AgrupacionService } from 'app/entities/agrupacion';

@Component({
    selector: 'jhi-contacto-update',
    templateUrl: './contacto-update.component.html'
})
export class ContactoUpdateComponent implements OnInit {
    contacto: IContacto;
    isSaving: boolean;

    agrupacions: IAgrupacion[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected contactoService: ContactoService,
        protected agrupacionService: AgrupacionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contacto }) => {
            this.contacto = contacto;
        });
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
        if (this.contacto.id !== undefined) {
            this.subscribeToSaveResponse(this.contactoService.update(this.contacto));
        } else {
            this.subscribeToSaveResponse(this.contactoService.create(this.contacto));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IContacto>>) {
        result.subscribe((res: HttpResponse<IContacto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
