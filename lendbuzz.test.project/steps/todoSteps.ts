import { Page } from '@playwright/test';
import { todoPage } from '../pages/todoPage';

export class todoSteps {
    private page: Page;
    private todoPageInstance: todoPage;

    constructor(page: Page) {
        this.page = page;
        this.todoPageInstance = new todoPage(page);
    }

    async navigateToApp(): Promise<void> {
        await this.todoPageInstance.navigateToApp();
    }

    async addTodoItem(item: string): Promise<void> {
        await this.todoPageInstance.addTodoItem(item);
    }

    async completeTodoItem(index: number): Promise<void> {
        await this.todoPageInstance.completeTodoItem(index);
    }

    async deleteTodoItem(index: number): Promise<void> {
        await this.todoPageInstance.deleteTodoItem(index);
    }

    async filterCompletedItems(): Promise<void> {
        await this.todoPageInstance.filterCompletedItems();
    }

    async isTodoItemHidden(item: string): Promise<boolean> {
        return await this.todoPageInstance.isTodoItemHidden(item);
    }

    async isTodoItemCompleted(index: number): Promise<boolean> {
        return await this.todoPageInstance.isTodoItemCompleted(index);
    }
}
