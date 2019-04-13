import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoLey } from 'app/shared/model/tipo-ley.model';

@Component({
    selector: 'jhi-tipo-ley-detail',
    templateUrl: './tipo-ley-detail.component.html'
})
export class TipoLeyDetailComponent implements OnInit {
    tipoLey: ITipoLey;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoLey }) => {
            this.tipoLey = tipoLey;
        });
    }

    previousState() {
        window.history.back();
    }
}
