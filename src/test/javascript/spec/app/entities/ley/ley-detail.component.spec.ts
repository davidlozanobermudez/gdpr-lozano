/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { LeyDetailComponent } from 'app/entities/ley/ley-detail.component';
import { Ley } from 'app/shared/model/ley.model';

describe('Component Tests', () => {
    describe('Ley Management Detail Component', () => {
        let comp: LeyDetailComponent;
        let fixture: ComponentFixture<LeyDetailComponent>;
        const route = ({ data: of({ ley: new Ley(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [LeyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LeyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LeyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ley).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
