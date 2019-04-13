/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { TrazaPeticionUpdateComponent } from 'app/entities/traza-peticion/traza-peticion-update.component';
import { TrazaPeticionService } from 'app/entities/traza-peticion/traza-peticion.service';
import { TrazaPeticion } from 'app/shared/model/traza-peticion.model';

describe('Component Tests', () => {
    describe('TrazaPeticion Management Update Component', () => {
        let comp: TrazaPeticionUpdateComponent;
        let fixture: ComponentFixture<TrazaPeticionUpdateComponent>;
        let service: TrazaPeticionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [TrazaPeticionUpdateComponent]
            })
                .overrideTemplate(TrazaPeticionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrazaPeticionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrazaPeticionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TrazaPeticion(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.trazaPeticion = entity;
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
                    const entity = new TrazaPeticion();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.trazaPeticion = entity;
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
