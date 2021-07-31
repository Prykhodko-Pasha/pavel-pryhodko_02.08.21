// import './sass/main.scss';
import movCardTpl from './templates/mov-card.hbs';
import movCards from './movies.json';

const refs = {
  // themeCheckbox: document.querySelector('#theme-switch-toggle'),
  // body: document.querySelector('body'),
  movGall: document.querySelector('.mov-gall__list'),
  favList: document.querySelector('.fav-list'),
  // switchMarker: document.querySelector('.theme-switch__marker'),
};

// const Theme = {
//   LIGHT: 'light-theme',
//   DARK: 'dark-theme',
// };

// установка темы, если до этого она была изменена
// populateTheme();

// function populateTheme() {
//   const localStorageTheme = localStorage.getItem('theme');
//   if (localStorageTheme === Theme.DARK) {
//     refs.body.className = Theme.DARK;
//     refs.themeCheckbox.checked = true;
//     refs.switchMarker.style.transition = 'none';
//   } else {
//     refs.body.className = Theme.LIGHT;
//   }
// }

// // изменение темы
// refs.themeCheckbox.addEventListener('change', onChangeTheme);

// function onChangeTheme() {
//   refs.switchMarker.style.transition = '';
//   if (refs.body.className === Theme.DARK) {
//     refs.body.className = Theme.LIGHT;
//     localStorage.setItem('theme', Theme.LIGHT);
//   } else {
//     refs.body.className = Theme.DARK;
//     localStorage.setItem('theme', Theme.DARK);
//   }
// }

// создание и рендер разметки
const movGallMarkup = movCards.map(card => movCardTpl(card)).join('');

refs.movGall.innerHTML = movGallMarkup;

// добавление в список фаворитов
refs.movGall.addEventListener('click', onAddToFavList);

function onAddToFavList(e) {
  // refs.switchMarker.style.transition = '';
  // console.log(e.target.className);
  if (e.target.className === 'chBox') {
    if (e.target.checked) {
      const movieId = parseInt(e.target.id) - 1;
      // console.log(movieId);
      const movieName = `<li class='fav-${e.target.id}'>${movCards[movieId].name}</li>`;
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
