/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { TrazaPeticionDetailComponent } from 'app/entities/traza-peticion/traza-peticion-detail.component';
import { TrazaPeticion } from 'app/shared/model/traza-peticion.model';

describe('Component Tests', () => {
    describe('TrazaPeticion Management Detail Component', () => {
        let comp: TrazaPeticionDetailComponent;
        let fixture: ComponentFixture<TrazaPeticionDetailComponent>;
        const route = ({ data: of({ trazaPeticion: new TrazaPeticion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [TrazaPeticionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TrazaPeticionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrazaPeticionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.trazaPeticion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
