import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GdprLozanoSharedModule } from 'app/shared';
import {
    AgrupacionComponent,
    AgrupacionDetailComponent,
    AgrupacionUpdateComponent,
    AgrupacionDeletePopupComponent,
    AgrupacionDeleteDialogComponent,
    agrupacionRoute,
    agrupacionPopupRoute
} from './';

const ENTITY_STATES = [...agrupacionRoute, ...agrupacionPopupRoute];

@NgModule({
    imports: [GdprLozanoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AgrupacionComponent,
        AgrupacionDetailComponent,
        AgrupacionUpdateComponent,
        AgrupacionDeleteDialogComponent,
        AgrupacionDeletePopupComponent
    ],
    entryComponents: [AgrupacionComponent, AgrupacionUpdateComponent, AgrupacionDeleteDialogComponent, AgrupacionDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GdprLozanoAgrupacionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
