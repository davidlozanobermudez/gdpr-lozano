/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { SubscripcionUpdateComponent } from 'app/entities/subscripcion/subscripcion-update.component';
import { SubscripcionService } from 'app/entities/subscripcion/subscripcion.service';
import { Subscripcion } from 'app/shared/model/subscripcion.model';

describe('Component Tests', () => {
    describe('Subscripcion Management Update Component', () => {
        let comp: SubscripcionUpdateComponent;
        let fixture: ComponentFixture<SubscripcionUpdateComponent>;
        let service: SubscripcionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [SubscripcionUpdateComponent]
            })
                .overrideTemplate(SubscripcionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubscripcionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscripcionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Subscripcion(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subscripcion = entity;
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
                    const entity = new Subscripcion();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subscripcion = entity;
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
