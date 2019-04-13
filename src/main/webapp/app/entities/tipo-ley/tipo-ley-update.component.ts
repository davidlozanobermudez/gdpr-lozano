import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ITipoLey } from 'app/shared/model/tipo-ley.model';
import { TipoLeyService } from './tipo-ley.service';

@Component({
    selector: 'jhi-tipo-ley-update',
    templateUrl: './tipo-ley-update.component.html'
})
export class TipoLeyUpdateComponent implements OnInit {
    tipoLey: ITipoLey;
    isSaving: boolean;

    constructor(protected tipoLeyService: TipoLeyService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoLey }) => {
            this.tipoLey = tipoLey;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoLey.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoLeyService.update(this.tipoLey));
        } else {
            this.subscribeToSaveResponse(this.tipoLeyService.create(this.tipoLey));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoLey>>) {
        result.subscribe((res: HttpResponse<ITipoLey>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
