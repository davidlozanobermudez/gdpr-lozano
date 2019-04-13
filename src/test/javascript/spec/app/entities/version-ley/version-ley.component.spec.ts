/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GdprLozanoTestModule } from '../../../test.module';
import { VersionLeyComponent } from 'app/entities/version-ley/version-ley.component';
import { VersionLeyService } from 'app/entities/version-ley/version-ley.service';
import { VersionLey } from 'app/shared/model/version-ley.model';

describe('Component Tests', () => {
    describe('VersionLey Management Component', () => {
        let comp: VersionLeyComponent;
        let fixture: ComponentFixture<VersionLeyComponent>;
        let service: VersionLeyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [VersionLeyComponent],
                providers: []
            })
                .overrideTemplate(VersionLeyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VersionLeyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VersionLeyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VersionLey(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.versionLeys[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
