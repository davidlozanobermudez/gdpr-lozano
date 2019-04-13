/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GdprLozanoTestModule } from '../../../test.module';
import { ContactoSubscripcionComponent } from 'app/entities/contacto-subscripcion/contacto-subscripcion.component';
import { ContactoSubscripcionService } from 'app/entities/contacto-subscripcion/contacto-subscripcion.service';
import { ContactoSubscripcion } from 'app/shared/model/contacto-subscripcion.model';

describe('Component Tests', () => {
    describe('ContactoSubscripcion Management Component', () => {
        let comp: ContactoSubscripcionComponent;
        let fixture: ComponentFixture<ContactoSubscripcionComponent>;
        let service: ContactoSubscripcionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [ContactoSubscripcionComponent],
                providers: []
            })
                .overrideTemplate(ContactoSubscripcionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContactoSubscripcionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactoSubscripcionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ContactoSubscripcion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.contactoSubscripcions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
