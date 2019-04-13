import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GdprLozanoSharedModule } from 'app/shared';
import {
    OperacionComponent,
    OperacionDetailComponent,
    OperacionUpdateComponent,
    OperacionDeletePopupComponent,
    OperacionDeleteDialogComponent,
    operacionRoute,
    operacionPopupRoute
} from './';

const ENTITY_STATES = [...operacionRoute, ...operacionPopupRoute];

@NgModule({
    imports: [GdprLozanoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OperacionComponent,
        OperacionDetailComponent,
        OperacionUpdateComponent,
        OperacionDeleteDialogComponent,
        OperacionDeletePopupComponent
    ],
    entryComponents: [OperacionComponent, OperacionUpdateComponent, OperacionDeleteDialogComponent, OperacionDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GdprLozanoOperacionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
