import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GdprLozanoSharedModule } from 'app/shared';
import {
    LeyComponent,
    LeyDetailComponent,
    LeyUpdateComponent,
    LeyDeletePopupComponent,
    LeyDeleteDialogComponent,
    leyRoute,
    leyPopupRoute
} from './';

const ENTITY_STATES = [...leyRoute, ...leyPopupRoute];

@NgModule({
    imports: [GdprLozanoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [LeyComponent, LeyDetailComponent, LeyUpdateComponent, LeyDeleteDialogComponent, LeyDeletePopupComponent],
    entryComponents: [LeyComponent, LeyUpdateComponent, LeyDeleteDialogComponent, LeyDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GdprLozanoLeyModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
