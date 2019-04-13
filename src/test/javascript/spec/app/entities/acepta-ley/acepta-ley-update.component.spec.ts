/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { AceptaLeyUpdateComponent } from 'app/entities/acepta-ley/acepta-ley-update.component';
import { AceptaLeyService } from 'app/entities/acepta-ley/acepta-ley.service';
import { AceptaLey } from 'app/shared/model/acepta-ley.model';

describe('Component Tests', () => {
    describe('AceptaLey Management Update Component', () => {
        let comp: AceptaLeyUpdateComponent;
        let fixture: ComponentFixture<AceptaLeyUpdateComponent>;
        let service: AceptaLeyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [AceptaLeyUpdateComponent]
            })
                .overrideTemplate(AceptaLeyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AceptaLeyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AceptaLeyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AceptaLey(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.aceptaLey = entity;
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
                    const entity = new AceptaLey();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.aceptaLey = entity;
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
