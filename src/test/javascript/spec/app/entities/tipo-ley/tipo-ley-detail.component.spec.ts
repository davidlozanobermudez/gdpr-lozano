/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { TipoLeyDetailComponent } from 'app/entities/tipo-ley/tipo-ley-detail.component';
import { TipoLey } from 'app/shared/model/tipo-ley.model';

describe('Component Tests', () => {
    describe('TipoLey Management Detail Component', () => {
        let comp: TipoLeyDetailComponent;
        let fixture: ComponentFixture<TipoLeyDetailComponent>;
        const route = ({ data: of({ tipoLey: new TipoLey(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [TipoLeyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TipoLeyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoLeyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tipoLey).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
