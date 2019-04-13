import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubscripcion } from 'app/shared/model/subscripcion.model';

@Component({
    selector: 'jhi-subscripcion-detail',
    templateUrl: './subscripcion-detail.component.html'
})
export class SubscripcionDetailComponent implements OnInit {
    subscripcion: ISubscripcion;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subscripcion }) => {
            this.subscripcion = subscripcion;
        });
    }

    previousState() {
        window.history.back();
    }
}
