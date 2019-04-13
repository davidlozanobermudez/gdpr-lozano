import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IOperacion } from 'app/shared/model/operacion.model';
import { OperacionService } from './operacion.service';

@Component({
    selector: 'jhi-operacion-update',
    templateUrl: './operacion-update.component.html'
})
export class OperacionUpdateComponent implements OnInit {
    operacion: IOperacion;
    isSaving: boolean;

    constructor(protected operacionService: OperacionService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ operacion }) => {
            this.operacion = operacion;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.operacion.id !== undefined) {
            this.subscribeToSaveResponse(this.operacionService.update(this.operacion));
        } else {
            this.subscribeToSaveResponse(this.operacionService.create(this.operacion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOperacion>>) {
        result.subscribe((res: HttpResponse<IOperacion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
