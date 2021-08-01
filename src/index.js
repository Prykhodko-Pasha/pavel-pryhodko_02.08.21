// import './sass/main.scss';
import movCardTpl from './templates/mov-card.hbs';
import movCards from './movies.json';

const refs = {
  movGall: document.querySelector('.mov-gall__list'),
  favList: document.querySelector('.fav-list'),
};

// создание и рендер разметки
const movGallMarkup = movCards.map(card => movCardTpl(card)).join('');

refs.movGall.innerHTML = movGallMarkup;

// добавление в список фаворитов
refs.movGall.addEventListener('click', onStarClick);

function onStarClick(e) {
  if (e.target.className === 'chBox') {
    if (e.target.checked) {
      addStarIdToLocalSt(e.target.id);
      const movieId = parseInt(e.target.id) - 1;
      // console.log(movieId);
      const movieName = `<li class='fav-item fav-${e.target.id}'>${movCards[movieId].name}<button type="button" class="close-btn"></li>`;
      // console.log(movieName);
      refs.favList.insertAdjacentHTML('beforeend', movieName);
    } else {
      const favItemIdx = `.fav-${e.target.id}`;
      // console.log('favItemIdx: ', favItemIdx);
      const favItemToDelete = document.querySelector(favItemIdx);
      // console.log('favItemToDelete: ', favItemToDelete);
      refs.favList.removeChild(favItemToDelete);
    }
  }
}

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
}

// запоминание списка фаворитов
function addStarIdToLocalSt(id) {
  if (localStorage.getItem('starsIdList')) {
    const starsArr = JSON.parse(localStorage.getItem('starsIdList'));
    starsArr.push(id);
    localStorage.setItem('starsIdList', JSON.stringify(starsArr));
  } else {
    const starsArr = [id];
    localStorage.setItem('starsIdList', JSON.stringify(starsArr));
  }
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
