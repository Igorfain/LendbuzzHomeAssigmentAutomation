import { todoPage } from '../pages/todoPage';
export class todoSteps {
    page;
    todoPageInstance;
    constructor(page) {
        this.page = page;
        this.todoPageInstance = new todoPage(page);
    }
    async navigateToApp() {
        await this.todoPageInstance.navigateToApp();
    }
    async addTodoItem(item) {
        await this.todoPageInstance.addTodoItem(item);
    }
    async completeTodoItem(index) {
        await this.todoPageInstance.completeTodoItem(index);
    }
    async deleteTodoItem(index) {
        await this.todoPageInstance.deleteTodoItem(index);
    }
    async filterCompletedItems() {
        await this.todoPageInstance.filterCompletedItems();
    }
    async isTodoItemHidden(item) {
        return await this.todoPageInstance.isTodoItemHidden(item);
    }
    async isTodoItemCompleted(index) {
        return await this.todoPageInstance.isTodoItemCompleted(index);
    }
}
