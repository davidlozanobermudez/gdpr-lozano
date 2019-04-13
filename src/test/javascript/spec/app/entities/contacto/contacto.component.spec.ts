/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GdprLozanoTestModule } from '../../../test.module';
import { ContactoComponent } from 'app/entities/contacto/contacto.component';
import { ContactoService } from 'app/entities/contacto/contacto.service';
import { Contacto } from 'app/shared/model/contacto.model';

describe('Component Tests', () => {
    describe('Contacto Management Component', () => {
        let comp: ContactoComponent;
        let fixture: ComponentFixture<ContactoComponent>;
        let service: ContactoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [ContactoComponent],
                providers: []
            })
                .overrideTemplate(ContactoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContactoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Contacto(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.contactos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
