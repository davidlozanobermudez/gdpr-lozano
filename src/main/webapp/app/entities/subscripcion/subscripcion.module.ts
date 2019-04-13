import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GdprLozanoSharedModule } from 'app/shared';
import {
    SubscripcionComponent,
    SubscripcionDetailComponent,
    SubscripcionUpdateComponent,
    SubscripcionDeletePopupComponent,
    SubscripcionDeleteDialogComponent,
    subscripcionRoute,
    subscripcionPopupRoute
} from './';

const ENTITY_STATES = [...subscripcionRoute, ...subscripcionPopupRoute];

@NgModule({
    imports: [GdprLozanoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SubscripcionComponent,
        SubscripcionDetailComponent,
        SubscripcionUpdateComponent,
        SubscripcionDeleteDialogComponent,
        SubscripcionDeletePopupComponent
    ],
    entryComponents: [
        SubscripcionComponent,
        SubscripcionUpdateComponent,
        SubscripcionDeleteDialogComponent,
        SubscripcionDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GdprLozanoSubscripcionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
