import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GdprLozanoSharedModule } from 'app/shared';
import {
    ContactoComponent,
    ContactoDetailComponent,
    ContactoUpdateComponent,
    ContactoDeletePopupComponent,
    ContactoDeleteDialogComponent,
    contactoRoute,
    contactoPopupRoute
} from './';

const ENTITY_STATES = [...contactoRoute, ...contactoPopupRoute];

@NgModule({
    imports: [GdprLozanoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContactoComponent,
        ContactoDetailComponent,
        ContactoUpdateComponent,
        ContactoDeleteDialogComponent,
        ContactoDeletePopupComponent
    ],
    entryComponents: [ContactoComponent, ContactoUpdateComponent, ContactoDeleteDialogComponent, ContactoDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GdprLozanoContactoModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
