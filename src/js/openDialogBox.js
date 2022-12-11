function openDialogBox(element) {
  const dialogBox = document.createElement('DIV');
  const fileInput = document.createElement('INPUT');
  const textarea = document.createElement('TEXTAREA');
  const buttonAdd = document.createElement('BUTTON');
  const spanClosed = document.createElement('SPAN');

  dialogBox.classList.add('dialog_box');
  fileInput.classList.add('input_file');
  textarea.classList.add('textarea_task');
  buttonAdd.classList.add('button_add');
  spanClosed.classList.add('span_closed');

  fileInput.type = 'file';

  textarea.placeholder = 'Enter a title for this card...';
  buttonAdd.textContent = 'Add Card';
  spanClosed.textContent = '\u2573';

  element.closest('.column').appendChild(dialogBox);
  dialogBox.prepend(spanClosed);
  dialogBox.prepend(buttonAdd);
  dialogBox.prepend(textarea);
  dialogBox.prepend(fileInput);

  const {
    x, y, width, height,
  } = textarea.getBoundingClientRect();
  fileInput.style.top = `${y + height / 4}px`;
  fileInput.style.left = `${x}px`;
  fileInput.style.width = `${width}px`;
  fileInput.style.height = `${height / 2}px`;

  let img;

  fileInput.addEventListener('change', () => {
    const file = fileInput.files && fileInput.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
      img = e.target.result;
    });

    reader.readAsDataURL(file);

    fileInput.value = null;
  });

  const closedDialogBox = () => {
    dialogBox.closest('.column').appendChild(element);
    dialogBox.remove(dialogBox);
  };

  spanClosed.addEventListener('click', closedDialogBox);

  buttonAdd.addEventListener('click', () => {
    const newTask = document.createElement('DIV');
    newTask.classList.add('task');

    dialogBox.closest('.column').appendChild(newTask);

    const taskText = document.createElement('P');
    taskText.classList.add('task_text');
    taskText.textContent = textarea.value;

    newTask.prepend(taskText);

    if (img) {
      const taskImg = document.createElement('IMG');
      taskImg.classList.add('task-image');
      taskImg.classList.add('pictures');
      taskImg.src = img;
      newTask.prepend(taskImg);
    }

    closedDialogBox();
  });
}

export default openDialogBox;
