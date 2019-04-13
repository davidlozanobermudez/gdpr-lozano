import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IAceptaLey } from 'app/shared/model/acepta-ley.model';
import { AceptaLeyService } from './acepta-ley.service';
import { IContacto } from 'app/shared/model/contacto.model';
import { ContactoService } from 'app/entities/contacto';
import { IVersionLey } from 'app/shared/model/version-ley.model';
import { VersionLeyService } from 'app/entities/version-ley';

@Component({
    selector: 'jhi-acepta-ley-update',
    templateUrl: './acepta-ley-update.component.html'
})
export class AceptaLeyUpdateComponent implements OnInit {
    aceptaLey: IAceptaLey;
    isSaving: boolean;

    contactos: IContacto[];

    versionleys: IVersionLey[];
    fechaEnvio: string;
    fechaAceptacion: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected aceptaLeyService: AceptaLeyService,
        protected contactoService: ContactoService,
        protected versionLeyService: VersionLeyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ aceptaLey }) => {
            this.aceptaLey = aceptaLey;
            this.fechaEnvio = this.aceptaLey.fechaEnvio != null ? this.aceptaLey.fechaEnvio.format(DATE_TIME_FORMAT) : null;
            this.fechaAceptacion = this.aceptaLey.fechaAceptacion != null ? this.aceptaLey.fechaAceptacion.format(DATE_TIME_FORMAT) : null;
        });
        this.contactoService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IContacto[]>) => mayBeOk.ok),
                map((response: HttpResponse<IContacto[]>) => response.body)
            )
            .subscribe((res: IContacto[]) => (this.contactos = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.versionLeyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IVersionLey[]>) => mayBeOk.ok),
                map((response: HttpResponse<IVersionLey[]>) => response.body)
            )
            .subscribe((res: IVersionLey[]) => (this.versionleys = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.aceptaLey.fechaEnvio = this.fechaEnvio != null ? moment(this.fechaEnvio, DATE_TIME_FORMAT) : null;
        this.aceptaLey.fechaAceptacion = this.fechaAceptacion != null ? moment(this.fechaAceptacion, DATE_TIME_FORMAT) : null;
        if (this.aceptaLey.id !== undefined) {
            this.subscribeToSaveResponse(this.aceptaLeyService.update(this.aceptaLey));
        } else {
            this.subscribeToSaveResponse(this.aceptaLeyService.create(this.aceptaLey));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAceptaLey>>) {
        result.subscribe((res: HttpResponse<IAceptaLey>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackVersionLeyById(index: number, item: IVersionLey) {
        return item.id;
    }
}
