/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GdprLozanoTestModule } from '../../../test.module';
import { AgrupacionComponent } from 'app/entities/agrupacion/agrupacion.component';
import { AgrupacionService } from 'app/entities/agrupacion/agrupacion.service';
import { Agrupacion } from 'app/shared/model/agrupacion.model';

describe('Component Tests', () => {
    describe('Agrupacion Management Component', () => {
        let comp: AgrupacionComponent;
        let fixture: ComponentFixture<AgrupacionComponent>;
        let service: AgrupacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [AgrupacionComponent],
                providers: []
            })
                .overrideTemplate(AgrupacionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgrupacionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgrupacionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Agrupacion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.agrupacions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
