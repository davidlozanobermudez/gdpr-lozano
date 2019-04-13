import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubscripcionInt } from 'app/shared/model/subscripcion-int.model';

@Component({
    selector: 'jhi-subscripcion-int-detail',
    templateUrl: './subscripcion-int-detail.component.html'
})
export class SubscripcionIntDetailComponent implements OnInit {
    subscripcionInt: ISubscripcionInt;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subscripcionInt }) => {
            this.subscripcionInt = subscripcionInt;
        });
    }

    previousState() {
        window.history.back();
    }
}
