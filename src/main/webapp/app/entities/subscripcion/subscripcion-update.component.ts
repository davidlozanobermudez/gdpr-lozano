import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ISubscripcion } from 'app/shared/model/subscripcion.model';
import { SubscripcionService } from './subscripcion.service';

@Component({
    selector: 'jhi-subscripcion-update',
    templateUrl: './subscripcion-update.component.html'
})
export class SubscripcionUpdateComponent implements OnInit {
    subscripcion: ISubscripcion;
    isSaving: boolean;

    constructor(protected subscripcionService: SubscripcionService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subscripcion }) => {
            this.subscripcion = subscripcion;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.subscripcion.id !== undefined) {
            this.subscribeToSaveResponse(this.subscripcionService.update(this.subscripcion));
        } else {
            this.subscribeToSaveResponse(this.subscripcionService.create(this.subscripcion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubscripcion>>) {
        result.subscribe((res: HttpResponse<ISubscripcion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
