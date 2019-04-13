/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GdprLozanoTestModule } from '../../../test.module';
import { ContactoSubscripcionDetailComponent } from 'app/entities/contacto-subscripcion/contacto-subscripcion-detail.component';
import { ContactoSubscripcion } from 'app/shared/model/contacto-subscripcion.model';

describe('Component Tests', () => {
    describe('ContactoSubscripcion Management Detail Component', () => {
        let comp: ContactoSubscripcionDetailComponent;
        let fixture: ComponentFixture<ContactoSubscripcionDetailComponent>;
        const route = ({ data: of({ contactoSubscripcion: new ContactoSubscripcion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GdprLozanoTestModule],
                declarations: [ContactoSubscripcionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ContactoSubscripcionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContactoSubscripcionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.contactoSubscripcion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
