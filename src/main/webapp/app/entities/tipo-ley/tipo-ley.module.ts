import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GdprLozanoSharedModule } from 'app/shared';
import {
    TipoLeyComponent,
    TipoLeyDetailComponent,
    TipoLeyUpdateComponent,
    TipoLeyDeletePopupComponent,
    TipoLeyDeleteDialogComponent,
    tipoLeyRoute,
    tipoLeyPopupRoute
} from './';

const ENTITY_STATES = [...tipoLeyRoute, ...tipoLeyPopupRoute];

@NgModule({
    imports: [GdprLozanoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoLeyComponent,
        TipoLeyDetailComponent,
        TipoLeyUpdateComponent,
        TipoLeyDeleteDialogComponent,
        TipoLeyDeletePopupComponent
    ],
    entryComponents: [TipoLeyComponent, TipoLeyUpdateComponent, TipoLeyDeleteDialogComponent, TipoLeyDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GdprLozanoTipoLeyModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
