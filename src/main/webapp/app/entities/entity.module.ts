import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'language',
                loadChildren: './language/language.module#GdprLozanoLanguageModule'
            },
            {
                path: 'sistema',
                loadChildren: './sistema/sistema.module#GdprLozanoSistemaModule'
            },
            {
                path: 'agrupacion',
                loadChildren: './agrupacion/agrupacion.module#GdprLozanoAgrupacionModule'
            },
            {
                path: 'operacion',
                loadChildren: './operacion/operacion.module#GdprLozanoOperacionModule'
            },
            {
                path: 'tipo-ley',
                loadChildren: './tipo-ley/tipo-ley.module#GdprLozanoTipoLeyModule'
            },
            {
                path: 'ley',
                loadChildren: './ley/ley.module#GdprLozanoLeyModule'
            },
            {
                path: 'version-ley',
                loadChildren: './version-ley/version-ley.module#GdprLozanoVersionLeyModule'
            },
            {
                path: 'version-ley-int',
                loadChildren: './version-ley-int/version-ley-int.module#GdprLozanoVersionLeyIntModule'
            },
            {
                path: 'subscripcion',
                loadChildren: './subscripcion/subscripcion.module#GdprLozanoSubscripcionModule'
            },
            {
                path: 'subscripcion-int',
                loadChildren: './subscripcion-int/subscripcion-int.module#GdprLozanoSubscripcionIntModule'
            },
            {
                path: 'contacto',
                loadChildren: './contacto/contacto.module#GdprLozanoContactoModule'
            },
            {
                path: 'contacto-subscripcion',
                loadChildren: './contacto-subscripcion/contacto-subscripcion.module#GdprLozanoContactoSubscripcionModule'
            },
            {
                path: 'acepta-ley',
                loadChildren: './acepta-ley/acepta-ley.module#GdprLozanoAceptaLeyModule'
            },
            {
                path: 'traza-peticion',
                loadChildren: './traza-peticion/traza-peticion.module#GdprLozanoTrazaPeticionModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GdprLozanoEntityModule {}
