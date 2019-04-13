/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { ContactoSubscripcionUpdateComponent } from 'app/entities/contacto-subscripcion/contacto-subscripcion-update.component';
import { ContactoSubscripcionService } from 'app/entities/contacto-subscripcion/contacto-subscripcion.service';
import { ContactoSubscripcion } from 'app/shared/model/contacto-subscripcion.model';

describe('Component Tests', () => {
    describe('ContactoSubscripcion Management Update Component', () => {
        let comp: ContactoSubscripcionUpdateComponent;
        let fixture: ComponentFixture<ContactoSubscripcionUpdateComponent>;
        let service: ContactoSubscripcionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [ContactoSubscripcionUpdateComponent]
            })
                .overrideTemplate(ContactoSubscripcionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContactoSubscripcionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactoSubscripcionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ContactoSubscripcion(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contactoSubscripcion = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ContactoSubscripcion();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contactoSubscripcion = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
