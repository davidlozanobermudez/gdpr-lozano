import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GdprLozanoSharedModule } from 'app/shared';
import {
    AceptaLeyComponent,
    AceptaLeyDetailComponent,
    AceptaLeyUpdateComponent,
    AceptaLeyDeletePopupComponent,
    AceptaLeyDeleteDialogComponent,
    aceptaLeyRoute,
    aceptaLeyPopupRoute
} from './';

const ENTITY_STATES = [...aceptaLeyRoute, ...aceptaLeyPopupRoute];

@NgModule({
    imports: [GdprLozanoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AceptaLeyComponent,
        AceptaLeyDetailComponent,
        AceptaLeyUpdateComponent,
        AceptaLeyDeleteDialogComponent,
        AceptaLeyDeletePopupComponent
    ],
    entryComponents: [AceptaLeyComponent, AceptaLeyUpdateComponent, AceptaLeyDeleteDialogComponent, AceptaLeyDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GdprLozanoAceptaLeyModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
