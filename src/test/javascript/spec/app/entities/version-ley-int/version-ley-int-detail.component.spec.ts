/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { VersionLeyIntDetailComponent } from 'app/entities/version-ley-int/version-ley-int-detail.component';
import { VersionLeyInt } from 'app/shared/model/version-ley-int.model';

describe('Component Tests', () => {
    describe('VersionLeyInt Management Detail Component', () => {
        let comp: VersionLeyIntDetailComponent;
        let fixture: ComponentFixture<VersionLeyIntDetailComponent>;
        const route = ({ data: of({ versionLeyInt: new VersionLeyInt(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [VersionLeyIntDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VersionLeyIntDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VersionLeyIntDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.versionLeyInt).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
