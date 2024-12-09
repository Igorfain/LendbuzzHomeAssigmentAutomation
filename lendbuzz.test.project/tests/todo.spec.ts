import { test, expect, Page } from '@playwright/test';
import { todoSteps } from '../steps/todoSteps';

test.describe('TodoMVC Tests', function () {
    let page: Page;
    let steps: todoSteps;

    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        steps = new todoSteps(page); 
        await steps.navigateToApp(); 
    });

    test.afterEach(async () => {
        if (page) {
            await page.close();
        }
    });

    test('Add a new task', async function () {
        await steps.addTodoItem('Buy Milk');
        const todoItem = page.locator('.todo-list li label');
        await expect(todoItem).toHaveText('Buy Milk');
    });

    test('Complete a task', async function () {
        await steps.addTodoItem('Buy Milk');
        await steps.completeTodoItem(0);
        const isCompleted = await steps.isTodoItemCompleted(0);
        expect(isCompleted).toBeTruthy();
    });

    test('Delete a task', async function () {
        await steps.addTodoItem('Buy Milk'); 
        await steps.deleteTodoItem(0); 
        const todoList = await page.locator('.todo-list li label').allTextContents();
        expect(todoList).not.toContain('Buy Milk');
    });

    test('Filter tasks by completed', async function () {
        await steps.addTodoItem('Buy Milk');
        await steps.addTodoItem('Buy Chanukia');
        await steps.completeTodoItem(0);

        await steps.filterCompletedItems();

        const visibleTasks = await page.locator('.todo-list li label').allTextContents();
        expect(visibleTasks).toEqual(['Buy Milk']);
    });

});
