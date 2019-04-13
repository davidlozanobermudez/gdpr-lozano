/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AgrupacionComponentsPage, AgrupacionDeleteDialog, AgrupacionUpdatePage } from './agrupacion.page-object';

const expect = chai.expect;

describe('Agrupacion e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let agrupacionUpdatePage: AgrupacionUpdatePage;
    let agrupacionComponentsPage: AgrupacionComponentsPage;
    let agrupacionDeleteDialog: AgrupacionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Agrupacions', async () => {
        await navBarPage.goToEntity('agrupacion');
        agrupacionComponentsPage = new AgrupacionComponentsPage();
        await browser.wait(ec.visibilityOf(agrupacionComponentsPage.title), 5000);
        expect(await agrupacionComponentsPage.getTitle()).to.eq('gdprLozanoApp.agrupacion.home.title');
    });

    it('should load create Agrupacion page', async () => {
        await agrupacionComponentsPage.clickOnCreateButton();
        agrupacionUpdatePage = new AgrupacionUpdatePage();
        expect(await agrupacionUpdatePage.getPageTitle()).to.eq('gdprLozanoApp.agrupacion.home.createOrEditLabel');
        await agrupacionUpdatePage.cancel();
    });

    it('should create and save Agrupacions', async () => {
        const nbButtonsBeforeCreate = await agrupacionComponentsPage.countDeleteButtons();

        await agrupacionComponentsPage.clickOnCreateButton();
        await promise.all([
            agrupacionUpdatePage.setCodigoInput('codigo'),
            agrupacionUpdatePage.setNombreInput('nombre'),
            // agrupacionUpdatePage.leyesSelectLastOption(),
            agrupacionUpdatePage.operacionesSelectLastOption()
        ]);
        expect(await agrupacionUpdatePage.getCodigoInput()).to.eq('codigo');
        expect(await agrupacionUpdatePage.getNombreInput()).to.eq('nombre');
        await agrupacionUpdatePage.save();
        expect(await agrupacionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await agrupacionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Agrupacion', async () => {
        const nbButtonsBeforeDelete = await agrupacionComponentsPage.countDeleteButtons();
        await agrupacionComponentsPage.clickOnLastDeleteButton();

        agrupacionDeleteDialog = new AgrupacionDeleteDialog();
        expect(await agrupacionDeleteDialog.getDialogTitle()).to.eq('gdprLozanoApp.agrupacion.delete.question');
        await agrupacionDeleteDialog.clickOnConfirmButton();

        expect(await agrupacionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
