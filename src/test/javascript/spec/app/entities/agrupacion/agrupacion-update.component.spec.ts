/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { AgrupacionUpdateComponent } from 'app/entities/agrupacion/agrupacion-update.component';
import { AgrupacionService } from 'app/entities/agrupacion/agrupacion.service';
import { Agrupacion } from 'app/shared/model/agrupacion.model';

describe('Component Tests', () => {
    describe('Agrupacion Management Update Component', () => {
        let comp: AgrupacionUpdateComponent;
        let fixture: ComponentFixture<AgrupacionUpdateComponent>;
        let service: AgrupacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [AgrupacionUpdateComponent]
            })
                .overrideTemplate(AgrupacionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgrupacionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgrupacionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Agrupacion(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agrupacion = entity;
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
                    const entity = new Agrupacion();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agrupacion = entity;
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
