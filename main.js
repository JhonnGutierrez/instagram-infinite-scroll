const API_KEY = 'wp6XCkQ1Qzy5FJmwHMMtiJQL4JRkUSIJVMRRRcCeX-M'
const API_URL = 'https://randomuser.me/api/'
const url = `https://picsum.photos/500`

const contentContainer = document.getElementById('contentContainer')
const heartIcon = document.querySelector('#heartIcon')
const addIcon = document.querySelector('#addIcon');
const profilePhoto = document.getElementById("profilePhoto")
const profileName = document.querySelector("#profileName h1")

async function assignProfileInfo () {
    const res = await fetch(API_URL, {
        dataType: 'json'
    })
    const data = await res.json()
    profilePhoto.src = data.results[0].picture.large
    const name = data.results[0].name.first + ' ' + data.results[0].name.last
    profileName.textContent = data.results[0].login.username.toUpperCase()
}

async function createContent () {
    
    const img = document.createElement('img')
    const bigContent = document.createElement('div')
    const smallContent = document.createElement('div')
    const heart = document.createElement('ion-icon')
    const chat = document.createElement('ion-icon')
    const send = document.createElement('ion-icon')
    const bookmark = document.createElement('ion-icon')
    
    contentContainer.append(bigContent);
    bigContent.append(img, smallContent)
    smallContent.append(heart, chat, send, bookmark)
    
    bigContent.classList.add('content')
    heart.name = "heart-outline"
    chat.name = "chatbubble-outline"
    send.name = "send-outline"
    bookmark.name = "bookmark-outline"
    try {
        const res = await fetch(url)
        img.dataset.src = res.url
        observer.observe(bigContent)
    } catch (error) {
        createReloadButton(bigContent)
    }
}

function createReloadButton(parent) {
    const reloadButton = document.createElement('button')
    const reloadIcon = document.createElement('ion-icon')
    reloadIcon.name = 'reload-outline'
    reloadButton.append(reloadIcon)
    parent.append(reloadButton)
    reloadButton.addEventListener('click', reloadImage)
}

async function reloadImage (event) {
    const target = (() => {
        if (event.target.nodeName === 'BUTTON') {
            return event.target
        } else {
            return event.target.parentElement
        }
    })()
    const targetParent = target.parentElement
    const img = targetParent.querySelector('img')
    target.remove()
    try {
        const rta = await fetch(url)
        img.src = rta.url
    } catch (error) {
        createReloadButton(targetParent)
    }
}

function keyCreateContent (event) {
    if(event.key === 'Enter') {
        createContent()
    }
}

heartIcon.addEventListener('click', assignProfileInfo);
addIcon.addEventListener('click', createContent);
document.body.addEventListener('keypress', keyCreateContent)

try {
    assignProfileInfo()
} catch (error) {
    console.error(error);
    assignProfileInfo()
}

for( let i = 0; i < 3; i++){
    createContent();
}


const loadImage = (entrie) => {
    const img = entrie.target.firstChild

    img.src = img.dataset.src

    createContent()

    observer.unobserve(entrie.target)
}

const observer = new IntersectionObserver((entries) => {
    entries.filter((entrie) => entrie.isIntersecting).forEach(loadImage)
})
