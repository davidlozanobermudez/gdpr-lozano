import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAceptaLey } from 'app/shared/model/acepta-ley.model';

@Component({
    selector: 'jhi-acepta-ley-detail',
    templateUrl: './acepta-ley-detail.component.html'
})
export class AceptaLeyDetailComponent implements OnInit {
    aceptaLey: IAceptaLey;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ aceptaLey }) => {
            this.aceptaLey = aceptaLey;
        });
    }

    previousState() {
        window.history.back();
    }
}
