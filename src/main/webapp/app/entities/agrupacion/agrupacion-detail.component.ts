import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAgrupacion } from 'app/shared/model/agrupacion.model';

@Component({
    selector: 'jhi-agrupacion-detail',
    templateUrl: './agrupacion-detail.component.html'
})
export class AgrupacionDetailComponent implements OnInit {
    agrupacion: IAgrupacion;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agrupacion }) => {
            this.agrupacion = agrupacion;
        });
    }

    previousState() {
        window.history.back();
    }
}
