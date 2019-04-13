/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GdprLozanoTestModule } from '../../../test.module';
import { TipoLeyComponent } from 'app/entities/tipo-ley/tipo-ley.component';
import { TipoLeyService } from 'app/entities/tipo-ley/tipo-ley.service';
import { TipoLey } from 'app/shared/model/tipo-ley.model';

describe('Component Tests', () => {
    describe('TipoLey Management Component', () => {
        let comp: TipoLeyComponent;
        let fixture: ComponentFixture<TipoLeyComponent>;
        let service: TipoLeyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [TipoLeyComponent],
                providers: []
            })
                .overrideTemplate(TipoLeyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoLeyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoLeyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TipoLey(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tipolies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
