import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVersionLeyInt } from 'app/shared/model/version-ley-int.model';

@Component({
    selector: 'jhi-version-ley-int-detail',
    templateUrl: './version-ley-int-detail.component.html'
})
export class VersionLeyIntDetailComponent implements OnInit {
    versionLeyInt: IVersionLeyInt;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ versionLeyInt }) => {
            this.versionLeyInt = versionLeyInt;
        });
    }

    previousState() {
        window.history.back();
    }
}
