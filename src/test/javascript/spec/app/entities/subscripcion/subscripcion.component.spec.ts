/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GdprLozanoTestModule } from '../../../test.module';
import { SubscripcionComponent } from 'app/entities/subscripcion/subscripcion.component';
import { SubscripcionService } from 'app/entities/subscripcion/subscripcion.service';
import { Subscripcion } from 'app/shared/model/subscripcion.model';

describe('Component Tests', () => {
    describe('Subscripcion Management Component', () => {
        let comp: SubscripcionComponent;
        let fixture: ComponentFixture<SubscripcionComponent>;
        let service: SubscripcionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [SubscripcionComponent],
                providers: []
            })
                .overrideTemplate(SubscripcionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubscripcionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscripcionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Subscripcion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.subscripcions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
