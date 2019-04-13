/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GdprLozanoTestModule } from '../../../test.module';
import { TrazaPeticionComponent } from 'app/entities/traza-peticion/traza-peticion.component';
import { TrazaPeticionService } from 'app/entities/traza-peticion/traza-peticion.service';
import { TrazaPeticion } from 'app/shared/model/traza-peticion.model';

describe('Component Tests', () => {
    describe('TrazaPeticion Management Component', () => {
        let comp: TrazaPeticionComponent;
        let fixture: ComponentFixture<TrazaPeticionComponent>;
        let service: TrazaPeticionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [TrazaPeticionComponent],
                providers: []
            })
                .overrideTemplate(TrazaPeticionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrazaPeticionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrazaPeticionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TrazaPeticion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.trazaPeticions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
