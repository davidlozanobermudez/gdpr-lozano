import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITrazaPeticion } from 'app/shared/model/traza-peticion.model';
import { TrazaPeticionService } from './traza-peticion.service';
import { IContacto } from 'app/shared/model/contacto.model';
import { ContactoService } from 'app/entities/contacto';

@Component({
    selector: 'jhi-traza-peticion-update',
    templateUrl: './traza-peticion-update.component.html'
})
export class TrazaPeticionUpdateComponent implements OnInit {
    trazaPeticion: ITrazaPeticion;
    isSaving: boolean;

    contactos: IContacto[];
    fecha: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected trazaPeticionService: TrazaPeticionService,
        protected contactoService: ContactoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ trazaPeticion }) => {
            this.trazaPeticion = trazaPeticion;
            this.fecha = this.trazaPeticion.fecha != null ? this.trazaPeticion.fecha.format(DATE_TIME_FORMAT) : null;
        });
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
        this.trazaPeticion.fecha = this.fecha != null ? moment(this.fecha, DATE_TIME_FORMAT) : null;
        if (this.trazaPeticion.id !== undefined) {
            this.subscribeToSaveResponse(this.trazaPeticionService.update(this.trazaPeticion));
        } else {
            this.subscribeToSaveResponse(this.trazaPeticionService.create(this.trazaPeticion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrazaPeticion>>) {
        result.subscribe((res: HttpResponse<ITrazaPeticion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackContactoById(index: number, item: IContacto) {
        return item.id;
    }
}
