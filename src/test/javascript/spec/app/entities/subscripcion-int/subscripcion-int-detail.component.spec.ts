/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { SubscripcionIntDetailComponent } from 'app/entities/subscripcion-int/subscripcion-int-detail.component';
import { SubscripcionInt } from 'app/shared/model/subscripcion-int.model';

describe('Component Tests', () => {
    describe('SubscripcionInt Management Detail Component', () => {
        let comp: SubscripcionIntDetailComponent;
        let fixture: ComponentFixture<SubscripcionIntDetailComponent>;
        const route = ({ data: of({ subscripcionInt: new SubscripcionInt(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [SubscripcionIntDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SubscripcionIntDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubscripcionIntDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.subscripcionInt).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
