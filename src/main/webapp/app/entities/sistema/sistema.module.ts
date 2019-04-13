import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GdprLozanoSharedModule } from 'app/shared';
import {
    SistemaComponent,
    SistemaDetailComponent,
    SistemaUpdateComponent,
    SistemaDeletePopupComponent,
    SistemaDeleteDialogComponent,
    sistemaRoute,
    sistemaPopupRoute
} from './';

const ENTITY_STATES = [...sistemaRoute, ...sistemaPopupRoute];

@NgModule({
    imports: [GdprLozanoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SistemaComponent,
        SistemaDetailComponent,
        SistemaUpdateComponent,
        SistemaDeleteDialogComponent,
        SistemaDeletePopupComponent
    ],
    entryComponents: [SistemaComponent, SistemaUpdateComponent, SistemaDeleteDialogComponent, SistemaDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GdprLozanoSistemaModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
