/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    ContactoSubscripcionComponentsPage,
    ContactoSubscripcionDeleteDialog,
    ContactoSubscripcionUpdatePage
} from './contacto-subscripcion.page-object';

const expect = chai.expect;

describe('ContactoSubscripcion e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let contactoSubscripcionUpdatePage: ContactoSubscripcionUpdatePage;
    let contactoSubscripcionComponentsPage: ContactoSubscripcionComponentsPage;
    let contactoSubscripcionDeleteDialog: ContactoSubscripcionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ContactoSubscripcions', async () => {
        await navBarPage.goToEntity('contacto-subscripcion');
        contactoSubscripcionComponentsPage = new ContactoSubscripcionComponentsPage();
        await browser.wait(ec.visibilityOf(contactoSubscripcionComponentsPage.title), 5000);
        expect(await contactoSubscripcionComponentsPage.getTitle()).to.eq('gdprLozanoApp.contactoSubscripcion.home.title');
    });

    it('should load create ContactoSubscripcion page', async () => {
        await contactoSubscripcionComponentsPage.clickOnCreateButton();
        contactoSubscripcionUpdatePage = new ContactoSubscripcionUpdatePage();
        expect(await contactoSubscripcionUpdatePage.getPageTitle()).to.eq('gdprLozanoApp.contactoSubscripcion.home.createOrEditLabel');
        await contactoSubscripcionUpdatePage.cancel();
    });

    it('should create and save ContactoSubscripcions', async () => {
        const nbButtonsBeforeCreate = await contactoSubscripcionComponentsPage.countDeleteButtons();

        await contactoSubscripcionComponentsPage.clickOnCreateButton();
        await promise.all([
            contactoSubscripcionUpdatePage.setFechaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            contactoSubscripcionUpdatePage.contactoSelectLastOption(),
            contactoSubscripcionUpdatePage.subscripcionSelectLastOption()
        ]);
        expect(await contactoSubscripcionUpdatePage.getFechaInput()).to.contain('2001-01-01T02:30');
        await contactoSubscripcionUpdatePage.save();
        expect(await contactoSubscripcionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await contactoSubscripcionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ContactoSubscripcion', async () => {
        const nbButtonsBeforeDelete = await contactoSubscripcionComponentsPage.countDeleteButtons();
        await contactoSubscripcionComponentsPage.clickOnLastDeleteButton();

        contactoSubscripcionDeleteDialog = new ContactoSubscripcionDeleteDialog();
        expect(await contactoSubscripcionDeleteDialog.getDialogTitle()).to.eq('gdprLozanoApp.contactoSubscripcion.delete.question');
        await contactoSubscripcionDeleteDialog.clickOnConfirmButton();

        expect(await contactoSubscripcionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
