import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GdprLozanoSharedModule } from 'app/shared';
import {
    ContactoSubscripcionComponent,
    ContactoSubscripcionDetailComponent,
    ContactoSubscripcionUpdateComponent,
    ContactoSubscripcionDeletePopupComponent,
    ContactoSubscripcionDeleteDialogComponent,
    contactoSubscripcionRoute,
    contactoSubscripcionPopupRoute
} from './';

const ENTITY_STATES = [...contactoSubscripcionRoute, ...contactoSubscripcionPopupRoute];

@NgModule({
    imports: [GdprLozanoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContactoSubscripcionComponent,
        ContactoSubscripcionDetailComponent,
        ContactoSubscripcionUpdateComponent,
        ContactoSubscripcionDeleteDialogComponent,
        ContactoSubscripcionDeletePopupComponent
    ],
    entryComponents: [
        ContactoSubscripcionComponent,
        ContactoSubscripcionUpdateComponent,
        ContactoSubscripcionDeleteDialogComponent,
        ContactoSubscripcionDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GdprLozanoContactoSubscripcionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
