import { Page, test } from '@playwright/test';

export class todoPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToApp(): Promise<void> {
        const baseURL = test.info().project.use.baseURL;
        if (!baseURL) {
            throw new Error('baseURL is not defined in the Playwright configuration.');
        }
        await this.page.goto(baseURL);
    }

    async addTodoItem(item: string): Promise<void> {
        const inputField = this.page.locator('.new-todo');
        await inputField.fill(item);
        await this.page.keyboard.press('Enter');
    }

    async completeTodoItem(index: number): Promise<void> {
        const toggleCheckbox = this.page.locator('input[data-testid="todo-item-toggle"]').nth(index);
        await toggleCheckbox.check();
    }

    async deleteTodoItem(index: number): Promise<void> {
        const todoLabel = this.page.locator('label[data-testid="todo-item-label"]').nth(index);
        await todoLabel.hover();
        const destroyButton = this.page.locator('button[data-testid="todo-item-button"]').nth(index);
        await destroyButton.click();
    }

    async filterCompletedItems(): Promise<void> {
        const completedLink = this.page.locator('a[href="#/completed"]');
        await completedLink.click();
    }

    async isTodoItemHidden(item: string): Promise<boolean> {
        return await this.page.locator(`text=${item}`).isHidden();
    }

    async isTodoItemCompleted(index: number): Promise<boolean> {
        const todoItem = this.page.locator('li[data-testid="todo-item"]').nth(index);
        return await todoItem.evaluate((el) => el.classList.contains('completed'));
    }
}
