import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GdprLozanoSharedModule } from 'app/shared';
import {
    VersionLeyComponent,
    VersionLeyDetailComponent,
    VersionLeyUpdateComponent,
    VersionLeyDeletePopupComponent,
    VersionLeyDeleteDialogComponent,
    versionLeyRoute,
    versionLeyPopupRoute
} from './';

const ENTITY_STATES = [...versionLeyRoute, ...versionLeyPopupRoute];

@NgModule({
    imports: [GdprLozanoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VersionLeyComponent,
        VersionLeyDetailComponent,
        VersionLeyUpdateComponent,
        VersionLeyDeleteDialogComponent,
        VersionLeyDeletePopupComponent
    ],
    entryComponents: [VersionLeyComponent, VersionLeyUpdateComponent, VersionLeyDeleteDialogComponent, VersionLeyDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GdprLozanoVersionLeyModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
