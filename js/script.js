const img = document.querySelector('#gif-img');
const search = document.querySelector('form');
const inp = document.querySelector('#text-inp');
const spinner = document.querySelector('#spinner');

const assignImgUrl = (el, url) => {
  el.src = url
};

const setGifToSearch = () => {
  const gifToSearch = inp.value
  localStorage.setItem('val', gifToSearch)
};

const addElToClass = (el, className) => {
  el.classList.add(className)
};

const fetchRequestTimeout = setTimeout(() => {
  assignImgUrl(img, './img/256x256.png')
  alert('Oops! we ran into a problem, Try Again!')
}, 7000);

const fetchGif = () => {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=VtmQZFpxMbOczLM5Vw5zU8sqZ13H0VX7&s=${
      localStorage.getItem('val') ? localStorage.getItem('val') : 'cat'
    }`,
    { mode: 'cors' }
  )
    .then(response => {
      return response.json()
    })
    .then(response => {
      const girUrl = response.data.images.original.url
      assignImgUrl(img, girUrl)
      clearTimeout(fetchRequestTimeout)
      addElToClass(spinner, 'none')
    })
    .catch(e => {
      assignImgUrl(img, './img/256x256.png');
      clearTimeout(fetchRequestTimeout);
      addElToClass(spinner, 'none');
      alert(e);
    })
};

const startApp = () => {
  fetchGif()
  search.addEventListener('submit', setGifToSearch)
};

startApp();
