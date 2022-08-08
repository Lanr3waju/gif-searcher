const img = document.querySelector('#gif-img');
const search = document.querySelector('form');
const inp = document.querySelector('#text-inp');
const spinner = document.querySelector('#spinner');

const assignImgUrl = (el, url) => {
  el.src = url
}

const setVal = () => {
  const type = inp.value
  localStorage.setItem('val', type)
}

const fetchCatGif = () => {
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
      const catUrl = response.data.images.original.url
      assignImgUrl(img, catUrl)
      spinner.classList.add('none');
      clearTimeout(myTimeout)
    })
    .catch(e => {
      alert(e)
      assignImgUrl(img, './img/256x256.png')
    })
}

fetchCatGif()
const myTimeout = setTimeout(() => {
  alert('Poor Internet Connection, Try Again!')
}, 7000)
search.addEventListener('submit', setVal)
