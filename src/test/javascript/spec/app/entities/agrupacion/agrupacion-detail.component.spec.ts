/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { AgrupacionDetailComponent } from 'app/entities/agrupacion/agrupacion-detail.component';
import { Agrupacion } from 'app/shared/model/agrupacion.model';

describe('Component Tests', () => {
    describe('Agrupacion Management Detail Component', () => {
        let comp: AgrupacionDetailComponent;
        let fixture: ComponentFixture<AgrupacionDetailComponent>;
        const route = ({ data: of({ agrupacion: new Agrupacion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [AgrupacionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AgrupacionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgrupacionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.agrupacion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
