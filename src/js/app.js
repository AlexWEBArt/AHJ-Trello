import openDialogBox from './openDialogBox';
import edit from '../img/trello_dog.png';

console.log('app.js is bunled');

document.querySelector('.pictures').src = edit;

const columns = Array.from(document.querySelectorAll('.column'));
const addNewTask = document.querySelectorAll('.add_card');

function createClosedElement() {
  const div = document.createElement('div');
  div.classList.add('closed_element');
  div.textContent = '\u2573';

  return div;
}

function createShadowElement(element) {
  const div = document.createElement('div');
  const { width, height } = element.getBoundingClientRect();

  div.classList.add('shadow_element');

  div.style.width = `${width}px`;
  div.style.height = `${height}px`;
  return div;
}

let actualElement;

// const onMouseOver = (e) => {
//   actualElement.style.top = `${e.clientY}px`;
//   actualElement.style.left = `${e.clientX}px`;
// };

const onMouseMove = (evt) => {
  const { target } = evt;

  actualElement.style.top = `${evt.clientY - 20}px`;
  actualElement.style.left = `${evt.clientX - 50}px`;

  if (target.classList.contains('task') || target.classList.contains('title')) {
    const { y, height } = target.getBoundingClientRect();

    const shadowElement = createShadowElement(document.querySelector('.dragged'));
    let shadowZone;

    if ((y + height / 2) > evt.clientY && !target.classList.contains('title')) {
      if (document.querySelector('.shadow_element')) {
        document.querySelector('.shadow_element').remove();
      }
      shadowZone = evt.target.previousElementSibling.closest('.task') || evt.target.previousElementSibling.closest('h1');
      if (shadowZone) {
        shadowZone.insertAdjacentElement('afterend', shadowElement);
      }
    }
    if ((y + height / 2) < evt.clientY) {
      if (document.querySelector('.shadow_element')) {
        document.querySelector('.shadow_element').remove();
      }
      shadowZone = evt.target.nextElementSibling.closest('.task') || evt.target.nextElementSibling.closest('.add_card');
      if (shadowZone) {
        shadowZone.insertAdjacentElement('beforebegin', shadowElement);
      }
    }
  }
};

addNewTask.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    openDialogBox(item);
    item.remove(item);
  });
});

const taskInFokus = (e) => {
  const activeTask = e.target.closest('.task');
  if (activeTask) {
    const columnInFokus = activeTask.closest('.column');
    const closed = createClosedElement();

    const { x, y, width } = activeTask.getBoundingClientRect();

    closed.style.top = `${y + 2}px`;
    closed.style.left = `${width + x - 17}px`;

    if (!columnInFokus.querySelector('.closed_element')) {
      closed.addEventListener('click', () => {
        activeTask.remove();
        closed.remove();
      });

      columnInFokus.insertAdjacentElement('afterbegin', closed);
    }
  }

  if (document.querySelector('.closed_element') && !activeTask && e.target !== document.querySelector('.closed_element')) {
    document.querySelector('.closed_element').remove();
  }
};

const onMouseUp = (e) => {
  const mouseUpColomn = e.target.closest('.column');

  if (e.target.classList.contains('shadow_element')) {
    const shadowZone = mouseUpColomn.querySelector('.shadow_element');
    mouseUpColomn.insertBefore(actualElement, shadowZone);
  }

  actualElement.style.width = null;
  actualElement.style.height = null;

  actualElement.classList.remove('dragged');
  actualElement = undefined;

  if (document.querySelector('.shadow_element')) {
    document.querySelector('.shadow_element').remove();
  }

  document.documentElement.removeEventListener('mousemove', onMouseMove);
  document.documentElement.removeEventListener('mouseup', onMouseUp);
  // document.documentElement.removeEventListener('mouseover', onMouseOver);
  document.addEventListener('mousemove', taskInFokus);
};

document.addEventListener('mousemove', taskInFokus);

columns.forEach((item) => item.addEventListener('mousedown', (e) => {
    if (e.target.closest('.task')) {
      e.preventDefault();

      actualElement = e.target.closest('.task');
      const { width, height } = actualElement.getBoundingClientRect();
      actualElement.classList.add('dragged');

      document.removeEventListener('mousemove', taskInFokus);
      
      if (document.querySelector('.closed_element')) {
        document.querySelector('.closed_element').remove();
      }

      actualElement.style.width = `${width}px`;
      actualElement.style.height = `${height}px`;

      document.documentElement.addEventListener('mousemove', onMouseMove);
      document.documentElement.addEventListener('mouseup', onMouseUp);
      // document.documentElement.addEventListener('mouseover', onMouseOver);
    }
}));
