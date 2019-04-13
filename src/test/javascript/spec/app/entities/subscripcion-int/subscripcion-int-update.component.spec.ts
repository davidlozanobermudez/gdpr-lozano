/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { SubscripcionIntUpdateComponent } from 'app/entities/subscripcion-int/subscripcion-int-update.component';
import { SubscripcionIntService } from 'app/entities/subscripcion-int/subscripcion-int.service';
import { SubscripcionInt } from 'app/shared/model/subscripcion-int.model';

describe('Component Tests', () => {
    describe('SubscripcionInt Management Update Component', () => {
        let comp: SubscripcionIntUpdateComponent;
        let fixture: ComponentFixture<SubscripcionIntUpdateComponent>;
        let service: SubscripcionIntService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [SubscripcionIntUpdateComponent]
            })
                .overrideTemplate(SubscripcionIntUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubscripcionIntUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscripcionIntService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SubscripcionInt(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subscripcionInt = entity;
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
                    const entity = new SubscripcionInt();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subscripcionInt = entity;
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
