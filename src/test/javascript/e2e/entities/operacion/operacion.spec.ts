/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OperacionComponentsPage, OperacionDeleteDialog, OperacionUpdatePage } from './operacion.page-object';

const expect = chai.expect;

describe('Operacion e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let operacionUpdatePage: OperacionUpdatePage;
    let operacionComponentsPage: OperacionComponentsPage;
    let operacionDeleteDialog: OperacionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Operacions', async () => {
        await navBarPage.goToEntity('operacion');
        operacionComponentsPage = new OperacionComponentsPage();
        await browser.wait(ec.visibilityOf(operacionComponentsPage.title), 5000);
        expect(await operacionComponentsPage.getTitle()).to.eq('gdprLozanoApp.operacion.home.title');
    });

    it('should load create Operacion page', async () => {
        await operacionComponentsPage.clickOnCreateButton();
        operacionUpdatePage = new OperacionUpdatePage();
        expect(await operacionUpdatePage.getPageTitle()).to.eq('gdprLozanoApp.operacion.home.createOrEditLabel');
        await operacionUpdatePage.cancel();
    });

    it('should create and save Operacions', async () => {
        const nbButtonsBeforeCreate = await operacionComponentsPage.countDeleteButtons();

        await operacionComponentsPage.clickOnCreateButton();
        await promise.all([
            operacionUpdatePage.setCodigoInput('codigo'),
            operacionUpdatePage.setWsAsociadoInput('wsAsociado'),
            operacionUpdatePage.tipoSelectLastOption()
        ]);
        expect(await operacionUpdatePage.getCodigoInput()).to.eq('codigo');
        expect(await operacionUpdatePage.getWsAsociadoInput()).to.eq('wsAsociado');
        await operacionUpdatePage.save();
        expect(await operacionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await operacionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Operacion', async () => {
        const nbButtonsBeforeDelete = await operacionComponentsPage.countDeleteButtons();
        await operacionComponentsPage.clickOnLastDeleteButton();

        operacionDeleteDialog = new OperacionDeleteDialog();
        expect(await operacionDeleteDialog.getDialogTitle()).to.eq('gdprLozanoApp.operacion.delete.question');
        await operacionDeleteDialog.clickOnConfirmButton();

        expect(await operacionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
