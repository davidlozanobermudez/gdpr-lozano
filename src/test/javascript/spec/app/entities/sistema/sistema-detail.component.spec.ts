/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { SistemaDetailComponent } from 'app/entities/sistema/sistema-detail.component';
import { Sistema } from 'app/shared/model/sistema.model';

describe('Component Tests', () => {
    describe('Sistema Management Detail Component', () => {
        let comp: SistemaDetailComponent;
        let fixture: ComponentFixture<SistemaDetailComponent>;
        const route = ({ data: of({ sistema: new Sistema(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [SistemaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SistemaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SistemaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sistema).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
