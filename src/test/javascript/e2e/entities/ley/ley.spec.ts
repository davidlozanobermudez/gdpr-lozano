/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LeyComponentsPage, LeyDeleteDialog, LeyUpdatePage } from './ley.page-object';

const expect = chai.expect;

describe('Ley e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let leyUpdatePage: LeyUpdatePage;
    let leyComponentsPage: LeyComponentsPage;
    let leyDeleteDialog: LeyDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Leys', async () => {
        await navBarPage.goToEntity('ley');
        leyComponentsPage = new LeyComponentsPage();
        await browser.wait(ec.visibilityOf(leyComponentsPage.title), 5000);
        expect(await leyComponentsPage.getTitle()).to.eq('gdprLozanoApp.ley.home.title');
    });

    it('should load create Ley page', async () => {
        await leyComponentsPage.clickOnCreateButton();
        leyUpdatePage = new LeyUpdatePage();
        expect(await leyUpdatePage.getPageTitle()).to.eq('gdprLozanoApp.ley.home.createOrEditLabel');
        await leyUpdatePage.cancel();
    });

    it('should create and save Leys', async () => {
        const nbButtonsBeforeCreate = await leyComponentsPage.countDeleteButtons();

        await leyComponentsPage.clickOnCreateButton();
        await promise.all([
            leyUpdatePage.setCodigoInput('codigo'),
            leyUpdatePage.tipologiaSelectLastOption(),
            leyUpdatePage.setPlazoAnonimizadoInput('5'),
            leyUpdatePage.setCodPaisInput('codPais'),
            leyUpdatePage.tipoLeySelectLastOption()
        ]);
        expect(await leyUpdatePage.getCodigoInput()).to.eq('codigo');
        const selectedRequiereAnonimizacion = leyUpdatePage.getRequiereAnonimizacionInput();
        if (await selectedRequiereAnonimizacion.isSelected()) {
            await leyUpdatePage.getRequiereAnonimizacionInput().click();
            expect(await leyUpdatePage.getRequiereAnonimizacionInput().isSelected()).to.be.false;
        } else {
            await leyUpdatePage.getRequiereAnonimizacionInput().click();
            expect(await leyUpdatePage.getRequiereAnonimizacionInput().isSelected()).to.be.true;
        }
        expect(await leyUpdatePage.getPlazoAnonimizadoInput()).to.eq('5');
        const selectedAplicaAPais = leyUpdatePage.getAplicaAPaisInput();
        if (await selectedAplicaAPais.isSelected()) {
            await leyUpdatePage.getAplicaAPaisInput().click();
            expect(await leyUpdatePage.getAplicaAPaisInput().isSelected()).to.be.false;
        } else {
            await leyUpdatePage.getAplicaAPaisInput().click();
            expect(await leyUpdatePage.getAplicaAPaisInput().isSelected()).to.be.true;
        }
        expect(await leyUpdatePage.getCodPaisInput()).to.eq('codPais');
        await leyUpdatePage.save();
        expect(await leyUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await leyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Ley', async () => {
        const nbButtonsBeforeDelete = await leyComponentsPage.countDeleteButtons();
        await leyComponentsPage.clickOnLastDeleteButton();

        leyDeleteDialog = new LeyDeleteDialog();
        expect(await leyDeleteDialog.getDialogTitle()).to.eq('gdprLozanoApp.ley.delete.question');
        await leyDeleteDialog.clickOnConfirmButton();

        expect(await leyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
