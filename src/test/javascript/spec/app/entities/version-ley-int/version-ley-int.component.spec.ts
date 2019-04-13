/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GdprLozanoTestModule } from '../../../test.module';
import { VersionLeyIntComponent } from 'app/entities/version-ley-int/version-ley-int.component';
import { VersionLeyIntService } from 'app/entities/version-ley-int/version-ley-int.service';
import { VersionLeyInt } from 'app/shared/model/version-ley-int.model';

describe('Component Tests', () => {
    describe('VersionLeyInt Management Component', () => {
        let comp: VersionLeyIntComponent;
        let fixture: ComponentFixture<VersionLeyIntComponent>;
        let service: VersionLeyIntService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [VersionLeyIntComponent],
                providers: []
            })
                .overrideTemplate(VersionLeyIntComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VersionLeyIntComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VersionLeyIntService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VersionLeyInt(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.versionLeyInts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
