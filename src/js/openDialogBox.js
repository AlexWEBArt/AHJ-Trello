function openDialogBox(element) {
  const dialogBox = document.createElement('DIV');
  const textarea = document.createElement('TEXTAREA');
  const buttonAdd = document.createElement('BUTTON');
  const spanClosed = document.createElement('SPAN');

  dialogBox.classList.add('dialog_box');
  textarea.classList.add('textarea_task');
  buttonAdd.classList.add('button_add');
  spanClosed.classList.add('span_closed');

  textarea.placeholder = 'Enter a title for this card...';
  buttonAdd.textContent = 'Add Card';
  spanClosed.textContent = '\u2573';

  element.closest('.column').appendChild(dialogBox);
  dialogBox.prepend(spanClosed);
  dialogBox.prepend(buttonAdd);
  dialogBox.prepend(textarea);

  const closedDialogBox = () => {
    dialogBox.closest('.column').appendChild(element);
    dialogBox.remove(dialogBox);
  };

  spanClosed.addEventListener('click', closedDialogBox);

  buttonAdd.addEventListener('click', () => {
    const newTask = document.createElement('DIV');
    const taskText = document.createElement('P');

    newTask.classList.add('task');
    taskText.classList.add('task_text');

    taskText.textContent = textarea.value;

    dialogBox.closest('.column').appendChild(newTask);
    newTask.prepend(taskText);

    closedDialogBox();
  });
}

export default openDialogBox;
