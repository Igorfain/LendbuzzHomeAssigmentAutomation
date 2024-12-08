import { test } from '@playwright/test';
export class todoActions {
    page;
    constructor(page) {
        this.page = page;
    }
    async navigateToApp() {
        const baseURL = test.info().project.use.baseURL;
        if (!baseURL) {
            throw new Error('baseURL is not defined in the Playwright configuration.');
        }
        await this.page.goto(baseURL);
    }
    async addTodoItem(item) {
        const inputField = this.page.locator('.new-todo');
        await inputField.fill(item);
        await this.page.keyboard.press('Enter');
    }
    async completeTodoItem(index) {
        const toggleCheckbox = this.page.locator('input[data-testid="todo-item-toggle"]').nth(index);
        await toggleCheckbox.check();
    }
    async deleteTodoItem(index) {
        const todoLabel = this.page.locator('label[data-testid="todo-item-label"]').nth(index);
        await todoLabel.hover();
        const destroyButton = this.page.locator('button[data-testid="todo-item-button"]').nth(index);
        await destroyButton.click();
    }
    async filterCompletedItems() {
        const completedLink = this.page.locator('a[href="#/completed"]');
        await completedLink.click();
    }
    async isTodoItemHidden(item) {
        return await this.page.locator(`text=${item}`).isHidden();
    }
    async isTodoItemCompleted(index) {
        const todoItem = this.page.locator('li[data-testid="todo-item"]').nth(index);
        return await todoItem.evaluate((el) => el.classList.contains('completed'));
    }
}
