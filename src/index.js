import movCardTpl from './templates/mov-card.hbs';
import modalContentTpl from './templates/modal.hbs';
import movCards from './movies.json';

const refs = {
  movGall: document.querySelector('.mov-gall__list'),
  favList: document.querySelector('.fav-list'),
  modal: document.querySelector('.modal'),
  modalOverlay: document.querySelector('.modal__overlay'),
  modalContent: document.querySelector('.modal__content'),
};

// ========= рендер разметки галлереи =========
const movGallMarkup = movCards.map(card => movCardTpl(card)).join('');

refs.movGall.innerHTML = movGallMarkup;
// ===========================================

// ========= рендер разметки модалки =========
refs.movGall.addEventListener('click', onNameClick);
refs.favList.addEventListener('click', onFavNameClick);

function onNameClick(e) {
  if (e.target.className === 'card__name') {
    const movieId = e.target.dataset.id;
    GenerateModal(movieId);
  }
}

function onFavNameClick(e) {
  if (e.target.className !== 'close-btn') {
    const movieId = e.target.className.split('-').pop();
    GenerateModal(movieId);
  }
}

function GenerateModal(id) {
  const modalMurkup = modalContentTpl(movCards[id - 1]);
  refs.modalContent.innerHTML = modalMurkup;
  refs.modal.classList.add('is-open');

  window.addEventListener('keydown', onKeyPressModal);

  onPopulateModalStar(id);

  const modalCloseBtn = document.querySelector('.modal__close-btn');
  modalCloseBtn.addEventListener('click', onCloseModal);
}

function onPopulateModalStar(id) {
  const modalStarIcon = document.querySelector('.modal__fav-star__icon');
  const starToCheck = document.getElementById(id);
  if (starToCheck.checked) {
    modalStarIcon.classList.add('checked');
  }

  const modalChBox = document.querySelector('.modal__fav-star__chBox');
  modalChBox.addEventListener('click', () => {
    modalStarIcon.classList.toggle('checked');
  });
}
// ===========================================

// ========== закрытие модалки ===============
refs.modalOverlay.addEventListener('click', onCloseModal);

function onCloseModal() {
  refs.modal.classList.remove('is-open');
  refs.modalContent.innerHTML = '';

  window.removeEventListener('keydown', onKeyPressModal);
}

function onKeyPressModal(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}
// ===========================================

// составление списка фаворитов по клику на звездочку
refs.movGall.addEventListener('click', onStarClick);

function onStarClick(e) {
  // console.log(e.target.className);
  if (e.target.className === 'chBox') {
    const ElId = e.target.id;
    if (e.target.checked) {
      addStarIdToLS(ElId);
      const movieId = parseInt(ElId) - 1;
      const movieName = `<li class='fav-item fav-${ElId}'>${movCards[movieId].name}<button type="button" class="close-btn"></li>`;
      refs.favList.insertAdjacentHTML('beforeend', movieName);
      addFavItemToLS(movieName);
    } else {
      const favItemIdx = `.fav-${ElId}`;
      const favItemToDelete = document.querySelector(favItemIdx);
      refs.favList.removeChild(favItemToDelete);
      delElFromLS(ElId);
    }
  }
}
// ===========================================

// удаление со списка фаворитов нажатием на крестик
refs.favList.addEventListener('click', e => {
  // console.dir(e.target);
  if (e.target.className === 'close-btn') {
    onDelFromFavList(e);
  }
});

function onDelFromFavList(e) {
  const movieIdx = e.target.parentNode.className.split('-').pop();
  // console.log(movieIdx);
  const starToUncheck = document.getElementById(movieIdx);
  // console.log(starToUncheck);
  starToUncheck.checked = false;
  e.target.parentNode.remove();
  delElFromLS(movieIdx);
}
// ===========================================

// запоминание списка фаворитов
function addStarIdToLS(id) {
  if (localStorage.getItem('starsIdList')) {
    const starsArr = JSON.parse(localStorage.getItem('starsIdList'));
    starsArr.push(id);
    localStorage.setItem('starsIdList', JSON.stringify(starsArr));
  } else {
    const starsArr = [id];
    localStorage.setItem('starsIdList', JSON.stringify(starsArr));
  }
}

function delElFromLS(id) {
  const starsArr = JSON.parse(localStorage.getItem('starsIdList'));
  const elToDel = starsArr.indexOf(id);
  starsArr.splice(elToDel, 1);
  localStorage.setItem('starsIdList', JSON.stringify(starsArr));

  const favArr = JSON.parse(localStorage.getItem('favList'));
  favArr.splice(elToDel, 1);
  localStorage.setItem('favList', JSON.stringify(favArr));
}

onPopulateFavStars();
function onPopulateFavStars() {
  if (localStorage.getItem('starsIdList')) {
    const starsArr = JSON.parse(localStorage.getItem('starsIdList'));
    // console.log(starsArr);
    starsArr.map(id => {
      const starToCheck = document.getElementById(id);
      starToCheck.checked = true;
    });
  }
}

function addFavItemToLS(item) {
  if (localStorage.getItem('favList')) {
    const favArr = JSON.parse(localStorage.getItem('favList'));
    favArr.push(item);
    localStorage.setItem('favList', JSON.stringify(favArr));
  } else {
    const favArr = [item];
    localStorage.setItem('favList', JSON.stringify(favArr));
  }
}

onPopulateFavList();
function onPopulateFavList() {
  if (localStorage.getItem('favList')) {
    const favArr = JSON.parse(localStorage.getItem('favList'));
    // console.log(favArr);
    const favListMarkUp = favArr.join('');
    refs.favList.innerHTML = favListMarkUp;
  }
}
// ===========================================
