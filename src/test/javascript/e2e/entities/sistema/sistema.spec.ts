/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SistemaComponentsPage, SistemaDeleteDialog, SistemaUpdatePage } from './sistema.page-object';

const expect = chai.expect;

describe('Sistema e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let sistemaUpdatePage: SistemaUpdatePage;
    let sistemaComponentsPage: SistemaComponentsPage;
    let sistemaDeleteDialog: SistemaDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Sistemas', async () => {
        await navBarPage.goToEntity('sistema');
        sistemaComponentsPage = new SistemaComponentsPage();
        await browser.wait(ec.visibilityOf(sistemaComponentsPage.title), 5000);
        expect(await sistemaComponentsPage.getTitle()).to.eq('gdprLozanoApp.sistema.home.title');
    });

    it('should load create Sistema page', async () => {
        await sistemaComponentsPage.clickOnCreateButton();
        sistemaUpdatePage = new SistemaUpdatePage();
        expect(await sistemaUpdatePage.getPageTitle()).to.eq('gdprLozanoApp.sistema.home.createOrEditLabel');
        await sistemaUpdatePage.cancel();
    });

    it('should create and save Sistemas', async () => {
        const nbButtonsBeforeCreate = await sistemaComponentsPage.countDeleteButtons();

        await sistemaComponentsPage.clickOnCreateButton();
        await promise.all([sistemaUpdatePage.setNombreInput('nombre'), sistemaUpdatePage.operacionesSelectLastOption()]);
        expect(await sistemaUpdatePage.getNombreInput()).to.eq('nombre');
        await sistemaUpdatePage.save();
        expect(await sistemaUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await sistemaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Sistema', async () => {
        const nbButtonsBeforeDelete = await sistemaComponentsPage.countDeleteButtons();
        await sistemaComponentsPage.clickOnLastDeleteButton();

        sistemaDeleteDialog = new SistemaDeleteDialog();
        expect(await sistemaDeleteDialog.getDialogTitle()).to.eq('gdprLozanoApp.sistema.delete.question');
        await sistemaDeleteDialog.clickOnConfirmButton();

        expect(await sistemaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
