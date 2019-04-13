/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { TipoLeyUpdateComponent } from 'app/entities/tipo-ley/tipo-ley-update.component';
import { TipoLeyService } from 'app/entities/tipo-ley/tipo-ley.service';
import { TipoLey } from 'app/shared/model/tipo-ley.model';

describe('Component Tests', () => {
    describe('TipoLey Management Update Component', () => {
        let comp: TipoLeyUpdateComponent;
        let fixture: ComponentFixture<TipoLeyUpdateComponent>;
        let service: TipoLeyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [TipoLeyUpdateComponent]
            })
                .overrideTemplate(TipoLeyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoLeyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoLeyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TipoLey(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoLey = entity;
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
                    const entity = new TipoLey();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoLey = entity;
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
