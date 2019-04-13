/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { LeyUpdateComponent } from 'app/entities/ley/ley-update.component';
import { LeyService } from 'app/entities/ley/ley.service';
import { Ley } from 'app/shared/model/ley.model';

describe('Component Tests', () => {
    describe('Ley Management Update Component', () => {
        let comp: LeyUpdateComponent;
        let fixture: ComponentFixture<LeyUpdateComponent>;
        let service: LeyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [LeyUpdateComponent]
            })
                .overrideTemplate(LeyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LeyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Ley(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ley = entity;
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
                    const entity = new Ley();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ley = entity;
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
