import { test, expect } from '@playwright/test';
import { todoActions } from '../actions/todoActions';
test.describe('TodoMVC Tests', function () {
    let page;
    let actions;
    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        actions = new todoActions(page);
        await actions.navigateToApp();
    });
    test.afterEach(async () => {
        if (page) {
            await page.close();
        }
    });
    test('Add a new task', async function () {
        await actions.addTodoItem('Buy Milk');
        const todoItem = page.locator('.todo-list li label');
        await expect(todoItem).toHaveText('Buy Milk');
    });
    test('Complete a task', async function () {
        await actions.addTodoItem('Buy Milk');
        await actions.completeTodoItem(0);
        const isCompleted = await actions.isTodoItemCompleted(0);
        expect(isCompleted).toBeTruthy();
    });
    test('Delete a task', async function () {
        await actions.addTodoItem('Buy Milk');
        await actions.deleteTodoItem(0);
        const isHidden = await actions.isTodoItemHidden('Buy Milk');
        expect(isHidden).toBeTruthy();
    });
    test('Filter tasks by completed', async function () {
        await actions.addTodoItem('Buy Milk');
        await actions.addTodoItem('Buy Chanukia');
        await actions.completeTodoItem(0);
        await actions.filterCompletedItems();
        const isHidden = await actions.isTodoItemHidden('Buy Chanukia');
        expect(isHidden).toBeTruthy();
        const isCompleted = await actions.isTodoItemCompleted(0);
        expect(isCompleted).toBeTruthy();
    });
});
