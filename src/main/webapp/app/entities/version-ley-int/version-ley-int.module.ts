import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GdprLozanoSharedModule } from 'app/shared';
import {
    VersionLeyIntComponent,
    VersionLeyIntDetailComponent,
    VersionLeyIntUpdateComponent,
    VersionLeyIntDeletePopupComponent,
    VersionLeyIntDeleteDialogComponent,
    versionLeyIntRoute,
    versionLeyIntPopupRoute
} from './';

const ENTITY_STATES = [...versionLeyIntRoute, ...versionLeyIntPopupRoute];

@NgModule({
    imports: [GdprLozanoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VersionLeyIntComponent,
        VersionLeyIntDetailComponent,
        VersionLeyIntUpdateComponent,
        VersionLeyIntDeleteDialogComponent,
        VersionLeyIntDeletePopupComponent
    ],
    entryComponents: [
        VersionLeyIntComponent,
        VersionLeyIntUpdateComponent,
        VersionLeyIntDeleteDialogComponent,
        VersionLeyIntDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GdprLozanoVersionLeyIntModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
