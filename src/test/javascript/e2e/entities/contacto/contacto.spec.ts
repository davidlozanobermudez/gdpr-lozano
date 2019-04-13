/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContactoComponentsPage, ContactoDeleteDialog, ContactoUpdatePage } from './contacto.page-object';

const expect = chai.expect;

describe('Contacto e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let contactoUpdatePage: ContactoUpdatePage;
    let contactoComponentsPage: ContactoComponentsPage;
    let contactoDeleteDialog: ContactoDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Contactos', async () => {
        await navBarPage.goToEntity('contacto');
        contactoComponentsPage = new ContactoComponentsPage();
        await browser.wait(ec.visibilityOf(contactoComponentsPage.title), 5000);
        expect(await contactoComponentsPage.getTitle()).to.eq('gdprLozanoApp.contacto.home.title');
    });

    it('should load create Contacto page', async () => {
        await contactoComponentsPage.clickOnCreateButton();
        contactoUpdatePage = new ContactoUpdatePage();
        expect(await contactoUpdatePage.getPageTitle()).to.eq('gdprLozanoApp.contacto.home.createOrEditLabel');
        await contactoUpdatePage.cancel();
    });

    it('should create and save Contactos', async () => {
        const nbButtonsBeforeCreate = await contactoComponentsPage.countDeleteButtons();

        await contactoComponentsPage.clickOnCreateButton();
        await promise.all([
            contactoUpdatePage.setIdCuentaInput('idCuenta'),
            contactoUpdatePage.statusSelectLastOption(),
            contactoUpdatePage.setEmailInput('email'),
            contactoUpdatePage.setTelefonoInput('telefono'),
            contactoUpdatePage.setCodPaisInput('codPais'),
            contactoUpdatePage.setCodIdomaInput('codIdoma')
            // contactoUpdatePage.agrupacionesSelectLastOption(),
        ]);
        expect(await contactoUpdatePage.getIdCuentaInput()).to.eq('idCuenta');
        expect(await contactoUpdatePage.getEmailInput()).to.eq('email');
        expect(await contactoUpdatePage.getTelefonoInput()).to.eq('telefono');
        expect(await contactoUpdatePage.getCodPaisInput()).to.eq('codPais');
        expect(await contactoUpdatePage.getCodIdomaInput()).to.eq('codIdoma');
        await contactoUpdatePage.save();
        expect(await contactoUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await contactoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Contacto', async () => {
        const nbButtonsBeforeDelete = await contactoComponentsPage.countDeleteButtons();
        await contactoComponentsPage.clickOnLastDeleteButton();

        contactoDeleteDialog = new ContactoDeleteDialog();
        expect(await contactoDeleteDialog.getDialogTitle()).to.eq('gdprLozanoApp.contacto.delete.question');
        await contactoDeleteDialog.clickOnConfirmButton();

        expect(await contactoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
