import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILey } from 'app/shared/model/ley.model';

@Component({
    selector: 'jhi-ley-detail',
    templateUrl: './ley-detail.component.html'
})
export class LeyDetailComponent implements OnInit {
    ley: ILey;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ley }) => {
            this.ley = ley;
        });
    }

    previousState() {
        window.history.back();
    }
}
