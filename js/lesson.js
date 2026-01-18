//карточки с персонажами

const defaultImg = 'https://i.pinimg.com/736x/48/c0/25/48c025b5141b7dd6dea071d303bab220.jpg'
const charactersList = document.querySelector('.characters-list')

const data = async () => {
  try {
    const response = await fetch('../data/characters.json')
    if(!response.ok) throw new Error('Ошибка загрузки персонажей')
    const characters = await response.json()
      const bioResponse = await fetch('/data/bio.json')
    if(!bioResponse.ok) throw new Error('Ошибка загрузки био')
    const bioData = await bioResponse.json()

      characters.forEach((character) => {
          const card = document.createElement('div')
          card.setAttribute('class', 'character-card')

          const image = character.photo || defaultImg
          card.innerHTML = `
              <div class="character-photo">
                  <img src="${image}" alt="${character.name}">
              </div>
              <h3>${character.name}</h3>
              <span>${character.age}</span>
          `
          card.onclick = () => {
                openModal(character, bioData)
            }

          charactersList.append(card)
      });
    
  } catch (error) {
        console.error('Произошла ошибка при получении данных:', error);
    }
}

const openModal = (character, bioData) => {
  const modal = document.createElement('div')
  modal.setAttribute('class','modal-overlay')
  
  const characterBio = bioData.find(item => item.name === character.name);
  modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn">&times;</button>
            <img src="${character.photo || defaultImg}" alt="${character.name}" style="width: 100%; border-radius: 10px;">
            <h2>${character.name}</h2>
            <p><strong>Возраст:</strong> ${character.age}</p>
            ${characterBio ? `
                <p><strong>Appearance:</strong> ${characterBio.appearance}</p>
                <p><strong>History:</strong> ${characterBio.history}</p>
            ` : `<p>Biography not found.</p>`}
        </div>
    `
    modal.querySelector('.close-btn').onclick = () => modal.remove()
   document.body.append(modal)
modal.addEventListener('click', (event) => {
    if(event.target === modal){
        modal.remove();
    }
})
}


data()


//2

const tabBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
const mainImg = document.querySelector('#tab_img')

const images = [
    "../images/discovery.jpg",
    "../images/Lind.webp",
    "../images/plan.webp",
    "../images/Ld.jfif",
    "../images/5.jpg"
];
let intervalId;
let currentIndex = 0;

const hideBlocks = () => {
  tabBlocks.forEach((item) => {
    item.style.display = 'none';
  });
  tabs.forEach((item) => {
    item.classList.remove('tab_content_item_active')
  })
};

const showBlock = (index = 0) => {
  tabBlocks[index].style.display = 'block'
  tabs[index].classList.add('tab_content_item_active')
  mainImg.src = images[index];
  currentIndex = index;
};

const autoSlider = () => {
  clearInterval(intervalId)
  intervalId = setInterval(() => {
    currentIndex++;
    if (currentIndex >= tabs.length) {
            currentIndex = 0;
        }
        hideBlocks();
        showBlock(currentIndex);
    }, 3000);
  }


hideBlocks();
showBlock(0);
autoSlider()

tabsParent.addEventListener('click', (event) => {
  if(event.target.tagName.toLowerCase() === 'button'){
    tabs.forEach((item, index) => {
      if(event.target === item){
        clearInterval(intervalId);
        hideBlocks();
        showBlock(index);
        autoSlider()
        }
      });
    }
    });
