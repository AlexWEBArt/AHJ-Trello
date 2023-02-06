import edit from '../img/trello_dog.png';

export default class RenderingField {
    constructor() {
        this.columnTodo = document.querySelector('.todo');
        this.columnInProgress = document.querySelector('.in_progress');
        this.columnDone = document.querySelector('.done');
    }

    renderingTextTask(column, text) {
        const containerTask = document.createElement('DIV');
        const textTask = document.createElement('P');

        containerTask.classList.add('task');
        textTask.classList.add('task_text');

        textTask.textContent = text;

        column.querySelector('.add_card').parentNode.insertBefore(containerTask, column.querySelector('.add_card'))
        containerTask.prepend(textTask);
    }

    renderingImg(column, text, img) {
        const containerTask = document.createElement('DIV');
        const imageTask = document.createElement('IMG');
        const textTask = document.createElement('P');

        containerTask.classList.add('task');
        imageTask.classList.add('task-image');
        imageTask.classList.add('picture');
        textTask.classList.add('task_text');

        imageTask.src = img;
        textTask.textContent = text;

        column.querySelector('.add_card').parentNode.insertBefore(containerTask, column.querySelector('.add_card'))
        containerTask.prepend(textTask);
        containerTask.prepend(imageTask);
    }

    defaultContent(column) {
        if (column === this.columnTodo) {
            return [
                'Welcome to Trello!', 
                'This is a card', 
                "Click on a card what's behind it"
            ]
        }
        if (column === this.columnInProgress) {
            return [
                'Invite your time to this board using the Add Members button',
                "Drag people onto a card to indicate that they're responsible for it"
            ]
        }
        if (column === this.columnDone) {
            return [
                'To learn more tricks, check out the guide',
                "Use as many boards as you want. We'll make more!"
            ]
        }
    }

    actionDefault() {
        this.defaultContent(this.columnTodo).forEach(element => {
            this.renderingTextTask(this.columnTodo, element)
        });

        this.renderingImg(this.columnTodo, 'You can attach pictures and files', edit)

        this.defaultContent(this.columnInProgress).forEach(element => {
            this.renderingTextTask(this.columnInProgress, element)
        });
        this.defaultContent(this.columnDone).forEach(element => {
            this.renderingTextTask(this.columnDone, element)
        });
        
    }

    actionStorage(data) {
        console.log(data.toDo)
        data.toDo.forEach(element => {
            this.renderingTextTask(this.columnTodo, element)
        });
        data.inProgress.forEach(element => {
            this.renderingTextTask(this.columnInProgress, element)
        });
        data.done.forEach(element => {
            this.renderingTextTask(this.columnDone, element)
        });
    }
}