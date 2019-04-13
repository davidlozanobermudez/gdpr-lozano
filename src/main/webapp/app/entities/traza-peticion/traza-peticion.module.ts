import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GdprLozanoSharedModule } from 'app/shared';
import {
    TrazaPeticionComponent,
    TrazaPeticionDetailComponent,
    TrazaPeticionUpdateComponent,
    TrazaPeticionDeletePopupComponent,
    TrazaPeticionDeleteDialogComponent,
    trazaPeticionRoute,
    trazaPeticionPopupRoute
} from './';

const ENTITY_STATES = [...trazaPeticionRoute, ...trazaPeticionPopupRoute];

@NgModule({
    imports: [GdprLozanoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TrazaPeticionComponent,
        TrazaPeticionDetailComponent,
        TrazaPeticionUpdateComponent,
        TrazaPeticionDeleteDialogComponent,
        TrazaPeticionDeletePopupComponent
    ],
    entryComponents: [
        TrazaPeticionComponent,
        TrazaPeticionUpdateComponent,
        TrazaPeticionDeleteDialogComponent,
        TrazaPeticionDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GdprLozanoTrazaPeticionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
