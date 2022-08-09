const img = document.querySelector('#gif-img')
const search = document.querySelector('form')
const spinner = document.querySelector('#spinner')
const errorPrompt = document.querySelector('#error-prompt')
const closeError = document.querySelector('#close')

const assignImgUrl = (el, url) => {
  el.src = url
}

const addElClass = (el, className) => {
  el.classList.add(className)
}

const removeElClass = (el, className) => {
  el.classList.remove(className)
}

const closeErrorPrompt = () => {
  addElClass(errorPrompt, 'none');
  removeElClass(img, 'none');
}

const fetchGif = event => {
  event.preventDefault()
  const inp = document.querySelector('#text-inp')
  addElClass(img, 'none')
  removeElClass(spinner, 'none')
  const gifToSearch = inp.value
  localStorage.setItem('val', gifToSearch)
  
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=qrMWKOWofYZsz4eOSCm92mboLFxOO8d4&s=${
      localStorage.getItem('val') ? localStorage.getItem('val') : 'cat'
    }`,
    { mode: 'cors' }
  )
    .then(response => {
      return response.json()
    })
    .then(response => {
      const {data: {images: {fixed_height_small: {url}}}} = response;
      const girUrl = url
      assignImgUrl(img, girUrl)
      removeElClass(img, 'none')
      addElClass(spinner, 'none')
    })
    .catch(e => {
      assignImgUrl(img, './img/128x128.png')
      addElClass(spinner, 'none')
      removeElClass(errorPrompt, 'none')
    })
}

const startApp = () => {
  assignImgUrl(img, './img/128x128.png')
  addElClass(spinner, 'none')
  search.addEventListener('submit', fetchGif)
  closeError.addEventListener('click', closeErrorPrompt)
}

startApp()
