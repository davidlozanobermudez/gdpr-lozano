/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { SistemaUpdateComponent } from 'app/entities/sistema/sistema-update.component';
import { SistemaService } from 'app/entities/sistema/sistema.service';
import { Sistema } from 'app/shared/model/sistema.model';

describe('Component Tests', () => {
    describe('Sistema Management Update Component', () => {
        let comp: SistemaUpdateComponent;
        let fixture: ComponentFixture<SistemaUpdateComponent>;
        let service: SistemaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [SistemaUpdateComponent]
            })
                .overrideTemplate(SistemaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SistemaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SistemaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Sistema(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sistema = entity;
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
                    const entity = new Sistema();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sistema = entity;
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
