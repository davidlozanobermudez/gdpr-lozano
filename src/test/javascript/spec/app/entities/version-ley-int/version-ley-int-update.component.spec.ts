/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { VersionLeyIntUpdateComponent } from 'app/entities/version-ley-int/version-ley-int-update.component';
import { VersionLeyIntService } from 'app/entities/version-ley-int/version-ley-int.service';
import { VersionLeyInt } from 'app/shared/model/version-ley-int.model';

describe('Component Tests', () => {
    describe('VersionLeyInt Management Update Component', () => {
        let comp: VersionLeyIntUpdateComponent;
        let fixture: ComponentFixture<VersionLeyIntUpdateComponent>;
        let service: VersionLeyIntService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [VersionLeyIntUpdateComponent]
            })
                .overrideTemplate(VersionLeyIntUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VersionLeyIntUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VersionLeyIntService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VersionLeyInt(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.versionLeyInt = entity;
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
                    const entity = new VersionLeyInt();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.versionLeyInt = entity;
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
