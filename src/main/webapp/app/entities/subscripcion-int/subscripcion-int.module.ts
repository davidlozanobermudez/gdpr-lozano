import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GdprLozanoSharedModule } from 'app/shared';
import {
    SubscripcionIntComponent,
    SubscripcionIntDetailComponent,
    SubscripcionIntUpdateComponent,
    SubscripcionIntDeletePopupComponent,
    SubscripcionIntDeleteDialogComponent,
    subscripcionIntRoute,
    subscripcionIntPopupRoute
} from './';

const ENTITY_STATES = [...subscripcionIntRoute, ...subscripcionIntPopupRoute];

@NgModule({
    imports: [GdprLozanoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SubscripcionIntComponent,
        SubscripcionIntDetailComponent,
        SubscripcionIntUpdateComponent,
        SubscripcionIntDeleteDialogComponent,
        SubscripcionIntDeletePopupComponent
    ],
    entryComponents: [
        SubscripcionIntComponent,
        SubscripcionIntUpdateComponent,
        SubscripcionIntDeleteDialogComponent,
        SubscripcionIntDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GdprLozanoSubscripcionIntModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
