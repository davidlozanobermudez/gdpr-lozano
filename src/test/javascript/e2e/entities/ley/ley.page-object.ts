import { element, by, ElementFinder } from 'protractor';

export class LeyComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-ley div table .btn-danger'));
    title = element.all(by.css('jhi-ley div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LeyUpdatePage {
    pageTitle = element(by.id('jhi-ley-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codigoInput = element(by.id('field_codigo'));
    tipologiaSelect = element(by.id('field_tipologia'));
    requiereAnonimizacionInput = element(by.id('field_requiereAnonimizacion'));
    plazoAnonimizadoInput = element(by.id('field_plazoAnonimizado'));
    aplicaAPaisInput = element(by.id('field_aplicaAPais'));
    codPaisInput = element(by.id('field_codPais'));
    tipoLeySelect = element(by.id('field_tipoLey'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCodigoInput(codigo) {
        await this.codigoInput.sendKeys(codigo);
    }

    async getCodigoInput() {
        return this.codigoInput.getAttribute('value');
    }

    async setTipologiaSelect(tipologia) {
        await this.tipologiaSelect.sendKeys(tipologia);
    }

    async getTipologiaSelect() {
        return this.tipologiaSelect.element(by.css('option:checked')).getText();
    }

    async tipologiaSelectLastOption() {
        await this.tipologiaSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    getRequiereAnonimizacionInput() {
        return this.requiereAnonimizacionInput;
    }
    async setPlazoAnonimizadoInput(plazoAnonimizado) {
        await this.plazoAnonimizadoInput.sendKeys(plazoAnonimizado);
    }

    async getPlazoAnonimizadoInput() {
        return this.plazoAnonimizadoInput.getAttribute('value');
    }

    getAplicaAPaisInput() {
        return this.aplicaAPaisInput;
    }
    async setCodPaisInput(codPais) {
        await this.codPaisInput.sendKeys(codPais);
    }

    async getCodPaisInput() {
        return this.codPaisInput.getAttribute('value');
    }

    async tipoLeySelectLastOption() {
        await this.tipoLeySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async tipoLeySelectOption(option) {
        await this.tipoLeySelect.sendKeys(option);
    }

    getTipoLeySelect(): ElementFinder {
        return this.tipoLeySelect;
    }

    async getTipoLeySelectedOption() {
        return this.tipoLeySelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class LeyDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-ley-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-ley'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
