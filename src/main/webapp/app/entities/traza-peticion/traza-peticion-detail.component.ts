import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrazaPeticion } from 'app/shared/model/traza-peticion.model';

@Component({
    selector: 'jhi-traza-peticion-detail',
    templateUrl: './traza-peticion-detail.component.html'
})
export class TrazaPeticionDetailComponent implements OnInit {
    trazaPeticion: ITrazaPeticion;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ trazaPeticion }) => {
            this.trazaPeticion = trazaPeticion;
        });
    }

    previousState() {
        window.history.back();
    }
}
