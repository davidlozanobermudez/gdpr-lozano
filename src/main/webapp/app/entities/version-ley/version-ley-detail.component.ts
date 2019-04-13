import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVersionLey } from 'app/shared/model/version-ley.model';

@Component({
    selector: 'jhi-version-ley-detail',
    templateUrl: './version-ley-detail.component.html'
})
export class VersionLeyDetailComponent implements OnInit {
    versionLey: IVersionLey;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ versionLey }) => {
            this.versionLey = versionLey;
        });
    }

    previousState() {
        window.history.back();
    }
}
