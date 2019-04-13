/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { AceptaLeyDetailComponent } from 'app/entities/acepta-ley/acepta-ley-detail.component';
import { AceptaLey } from 'app/shared/model/acepta-ley.model';

describe('Component Tests', () => {
    describe('AceptaLey Management Detail Component', () => {
        let comp: AceptaLeyDetailComponent;
        let fixture: ComponentFixture<AceptaLeyDetailComponent>;
        const route = ({ data: of({ aceptaLey: new AceptaLey(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [AceptaLeyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AceptaLeyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AceptaLeyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.aceptaLey).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
