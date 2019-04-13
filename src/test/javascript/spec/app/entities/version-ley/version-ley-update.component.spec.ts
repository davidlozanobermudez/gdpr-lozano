/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { VersionLeyUpdateComponent } from 'app/entities/version-ley/version-ley-update.component';
import { VersionLeyService } from 'app/entities/version-ley/version-ley.service';
import { VersionLey } from 'app/shared/model/version-ley.model';

describe('Component Tests', () => {
    describe('VersionLey Management Update Component', () => {
        let comp: VersionLeyUpdateComponent;
        let fixture: ComponentFixture<VersionLeyUpdateComponent>;
        let service: VersionLeyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [VersionLeyUpdateComponent]
            })
                .overrideTemplate(VersionLeyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VersionLeyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VersionLeyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VersionLey(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.versionLey = entity;
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
                    const entity = new VersionLey();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.versionLey = entity;
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
