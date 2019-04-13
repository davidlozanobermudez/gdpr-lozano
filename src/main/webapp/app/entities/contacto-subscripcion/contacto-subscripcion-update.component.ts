import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IContactoSubscripcion } from 'app/shared/model/contacto-subscripcion.model';
import { ContactoSubscripcionService } from './contacto-subscripcion.service';
import { IContacto } from 'app/shared/model/contacto.model';
import { ContactoService } from 'app/entities/contacto';
import { ISubscripcion } from 'app/shared/model/subscripcion.model';
import { SubscripcionService } from 'app/entities/subscripcion';

@Component({
    selector: 'jhi-contacto-subscripcion-update',
    templateUrl: './contacto-subscripcion-update.component.html'
})
export class ContactoSubscripcionUpdateComponent implements OnInit {
    contactoSubscripcion: IContactoSubscripcion;
    isSaving: boolean;

    contactos: IContacto[];

    subscripcions: ISubscripcion[];
    fecha: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected contactoSubscripcionService: ContactoSubscripcionService,
        protected contactoService: ContactoService,
        protected subscripcionService: SubscripcionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contactoSubscripcion }) => {
            this.contactoSubscripcion = contactoSubscripcion;
            this.fecha = this.contactoSubscripcion.fecha != null ? this.contactoSubscripcion.fecha.format(DATE_TIME_FORMAT) : null;
        });
        this.contactoService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IContacto[]>) => mayBeOk.ok),
                map((response: HttpResponse<IContacto[]>) => response.body)
            )
            .subscribe((res: IContacto[]) => (this.contactos = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.subscripcionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISubscripcion[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISubscripcion[]>) => response.body)
            )
            .subscribe((res: ISubscripcion[]) => (this.subscripcions = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.contactoSubscripcion.fecha = this.fecha != null ? moment(this.fecha, DATE_TIME_FORMAT) : null;
        if (this.contactoSubscripcion.id !== undefined) {
            this.subscribeToSaveResponse(this.contactoSubscripcionService.update(this.contactoSubscripcion));
        } else {
            this.subscribeToSaveResponse(this.contactoSubscripcionService.create(this.contactoSubscripcion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactoSubscripcion>>) {
        result.subscribe(
            (res: HttpResponse<IContactoSubscripcion>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackSubscripcionById(index: number, item: ISubscripcion) {
        return item.id;
    }
}
