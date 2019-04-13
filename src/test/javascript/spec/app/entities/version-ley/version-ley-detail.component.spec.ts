/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { VersionLeyDetailComponent } from 'app/entities/version-ley/version-ley-detail.component';
import { VersionLey } from 'app/shared/model/version-ley.model';

describe('Component Tests', () => {
    describe('VersionLey Management Detail Component', () => {
        let comp: VersionLeyDetailComponent;
        let fixture: ComponentFixture<VersionLeyDetailComponent>;
        const route = ({ data: of({ versionLey: new VersionLey(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [VersionLeyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VersionLeyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VersionLeyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.versionLey).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
