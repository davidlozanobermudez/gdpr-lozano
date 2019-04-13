/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VersionLeyComponentsPage, VersionLeyDeleteDialog, VersionLeyUpdatePage } from './version-ley.page-object';

const expect = chai.expect;

describe('VersionLey e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let versionLeyUpdatePage: VersionLeyUpdatePage;
    let versionLeyComponentsPage: VersionLeyComponentsPage;
    let versionLeyDeleteDialog: VersionLeyDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load VersionLeys', async () => {
        await navBarPage.goToEntity('version-ley');
        versionLeyComponentsPage = new VersionLeyComponentsPage();
        await browser.wait(ec.visibilityOf(versionLeyComponentsPage.title), 5000);
        expect(await versionLeyComponentsPage.getTitle()).to.eq('gdprLozanoApp.versionLey.home.title');
    });

    it('should load create VersionLey page', async () => {
        await versionLeyComponentsPage.clickOnCreateButton();
        versionLeyUpdatePage = new VersionLeyUpdatePage();
        expect(await versionLeyUpdatePage.getPageTitle()).to.eq('gdprLozanoApp.versionLey.home.createOrEditLabel');
        await versionLeyUpdatePage.cancel();
    });

    it('should create and save VersionLeys', async () => {
        const nbButtonsBeforeCreate = await versionLeyComponentsPage.countDeleteButtons();

        await versionLeyComponentsPage.clickOnCreateButton();
        await promise.all([
            versionLeyUpdatePage.setVersionInput('version'),
            versionLeyUpdatePage.setFechaDesdeInput('2000-12-31'),
            versionLeyUpdatePage.leySelectLastOption()
        ]);
        expect(await versionLeyUpdatePage.getVersionInput()).to.eq('version');
        expect(await versionLeyUpdatePage.getFechaDesdeInput()).to.eq('2000-12-31');
        await versionLeyUpdatePage.save();
        expect(await versionLeyUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await versionLeyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last VersionLey', async () => {
        const nbButtonsBeforeDelete = await versionLeyComponentsPage.countDeleteButtons();
        await versionLeyComponentsPage.clickOnLastDeleteButton();

        versionLeyDeleteDialog = new VersionLeyDeleteDialog();
        expect(await versionLeyDeleteDialog.getDialogTitle()).to.eq('gdprLozanoApp.versionLey.delete.question');
        await versionLeyDeleteDialog.clickOnConfirmButton();

        expect(await versionLeyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
