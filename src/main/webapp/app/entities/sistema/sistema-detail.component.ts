import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISistema } from 'app/shared/model/sistema.model';

@Component({
    selector: 'jhi-sistema-detail',
    templateUrl: './sistema-detail.component.html'
})
export class SistemaDetailComponent implements OnInit {
    sistema: ISistema;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sistema }) => {
            this.sistema = sistema;
        });
    }

    previousState() {
        window.history.back();
    }
}
