import { element, by, ElementFinder } from 'protractor';

export class OperacionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-operacion div table .btn-danger'));
    title = element.all(by.css('jhi-operacion div h2#page-heading span')).first();

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

export class OperacionUpdatePage {
    pageTitle = element(by.id('jhi-operacion-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codigoInput = element(by.id('field_codigo'));
    wsAsociadoInput = element(by.id('field_wsAsociado'));
    tipoSelect = element(by.id('field_tipo'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCodigoInput(codigo) {
        await this.codigoInput.sendKeys(codigo);
    }

    async getCodigoInput() {
        return this.codigoInput.getAttribute('value');
    }

    async setWsAsociadoInput(wsAsociado) {
        await this.wsAsociadoInput.sendKeys(wsAsociado);
    }

    async getWsAsociadoInput() {
        return this.wsAsociadoInput.getAttribute('value');
    }

    async setTipoSelect(tipo) {
        await this.tipoSelect.sendKeys(tipo);
    }

    async getTipoSelect() {
        return this.tipoSelect.element(by.css('option:checked')).getText();
    }

    async tipoSelectLastOption() {
        await this.tipoSelect
            .all(by.tagName('option'))
            .last()
            .click();
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

export class OperacionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-operacion-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-operacion'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
