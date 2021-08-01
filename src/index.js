import movCardTpl from './templates/mov-card.hbs';
import movCards from './movies.json';

const refs = {
  movGall: document.querySelector('.mov-gall__list'),
  favList: document.querySelector('.fav-list'),
};

// ============= рендер разметки =============
const movGallMarkup = movCards.map(card => movCardTpl(card)).join('');

refs.movGall.innerHTML = movGallMarkup;
// ===========================================

// составление списка фаворитов по клику на звездочку
refs.movGall.addEventListener('click', onStarClick);

function onStarClick(e) {
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
  // console.log(e.target.parentNode.textContent);
  const movieIdx = e.target.parentNode.className.split('').pop();
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
    console.log(starsArr);
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
    console.log(favArr);
    const favListMarkUp = favArr.join('');
    refs.favList.innerHTML = favListMarkUp;
  }
}
// ===========================================
