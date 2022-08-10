const img = document.querySelector('#gif-img')
const search = document.querySelector('form')
const spinner = document.querySelector('#spinner')
const errorPrompt = document.querySelector('#error-prompt')
const closeError = document.querySelector('#close')

const closeErrorPrompt = () => {
  errorPrompt.classList.add('none')
  img.classList.remove('none')
}

const fetchGif = async event => {
  event.preventDefault()
  const inp = document.querySelector('#text-inp')
  img.classList.add('none')
  spinner.classList.remove('none')
  const gifToSearch = inp.value

  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=qrMWKOWofYZsz4eOSCm92mboLFxOO8d4&s=${gifToSearch}`,
      { mode: 'cors' }
    )
    const {data: {
      images: {
        fixed_height_small: { url }
      }
    }
  } = await response.json()

    img.src = url;
    img.classList.remove('none')
    spinner.classList.add('none')
  } catch (e) {
    img.src = './img/128x128.png'
    spinner.classList.add('none')
    errorPrompt.classList.remove('none')
  }
}

const startApp = () => {
  img.src = './img/128x128.png'
  spinner.classList.add('none')
  search.addEventListener('submit', fetchGif)
  closeError.addEventListener('click', closeErrorPrompt)
}

startApp()
