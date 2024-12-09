import { test, expect } from '@playwright/test';
import { todoSteps } from '../steps/todoSteps';
test.describe('TodoMVC Tests', function () {
    let page;
    let steps;
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
        await steps.addTodoItem('Buy Milk'); // Add a task
        await steps.deleteTodoItem(0); // Attempt to delete the task
        const todoList = await page.locator('.todo-list li label').allTextContents();
        expect(todoList).not.toContain('Buy Milk'); // Assert that the task is no longer present
    });
    test('Filter tasks by completed', async function () {
        await steps.addTodoItem('Buy Milk');
        await steps.addTodoItem('Buy Chanukia');
        await steps.completeTodoItem(0); // Mark the first task as completed
        await steps.filterCompletedItems(); // Filter by completed tasks
        const visibleTasks = await page.locator('.todo-list li label').allTextContents();
        expect(visibleTasks).toEqual(['Buy Milk']); // Assert only completed tasks are shown
    });
});
