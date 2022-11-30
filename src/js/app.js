import openDialogBox from './openDialogBox';
import edit from '../img/trello_dog.png';

console.log('app.js is bunled');

document.querySelector('.pictures').src = edit;

const column = Array.from(document.querySelectorAll('.column'));
const tasks = Array.from(document.querySelectorAll('.task'));
const addNewTask = document.querySelectorAll('.add_card');

addNewTask.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    openDialogBox(item);
    item.remove(item);
  });
});

let actualElement;

const onMouseOver = (e) => {
  actualElement.style.top = `${e.clientY}px`;
  actualElement.style.left = `${e.clientX}px`;
};

const onMouseUp = (e) => {
  let mouseUpItem = e.target.closest('.task');
  if (mouseUpItem === null) {
    mouseUpItem = actualElement;
  }
  const actualColumn = mouseUpItem.closest('.column');

  actualColumn.insertBefore(actualElement, mouseUpItem);

  actualElement.classList.remove('dragged');
  actualElement = undefined;

  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mouseover', onMouseOver);
};

tasks.forEach((item) => {
  item.addEventListener('mouseover', () => {
    // if (!item.querySelector('.conainer_remove')) {
    //     const conainerRemove = document.createElement('DIV');

    //     conainerRemove.classList.add('conainer_remove');
    //     conainerRemove.textContent = `\u2573`;

    //     item.append(conainerRemove);

    //     conainerRemove.addEventListener('click', () => {
    //         item.closest('.column').remove(item)
    //     })
    // }
  });
});

column.forEach((item) => item.addEventListener('mousedown', (e) => {
  if (e.target.closest('.task')) {
    e.preventDefault();
    actualElement = e.target.closest('.task');
    actualElement.classList.add('dragged');

    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseover', onMouseOver);
  }
}));
