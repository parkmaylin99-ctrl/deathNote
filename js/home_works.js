

// const childBlock = document.querySelector('.child_block');
// const parentBlock = document.querySelector('.parent_block');

// const width = parentBlock.clientWidth - childBlock.clientWidth
// const height = parentBlock.clientHeight - childBlock.clientHeight
// // console.log(parentBlock);
// let positionX = 0; let positionY = 0;
// const animation = () => {
//  if (positionX < width && positionY === 0) {
//     positionX++;
//     childBlock.style.left = `${positionX}px`;
//     requestAnimationFrame(animation)
//  } else if (positionX >= width && positionY < height) {
//     positionY++;
//     childBlock.style.top = `${positionY}px`
//     requestAnimationFrame(animation) 
//  } else if (positionX > 0 && positionY >= height) {
//     positionX--;
//     childBlock.style.left = `${positionX}px`;
//     requestAnimationFrame(animation)
//  } else if (positionY > 0 && positionX <= 0) {
//     positionY--;
//     childBlock.style.top = `${positionY}px`
//     requestAnimationFrame(animation) 
//  } else {
//     requestAnimationFrame(animation)
//  }
// };
// animation()


const secNum = document.querySelector('#seconds');
const secStart = document.querySelector('#start')
const secStop = document.querySelector('#stop')
const secReset = document.querySelector('#reset')

let interval = null;
let count = 0;

secStart.addEventListener('click', () => {
    if(interval) return
    interval = setInterval(() => {
        count++;
        secNum.innerHTML = count;
    }, 1000)
}
);

secStop.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
})

secReset.addEventListener('click', () => {
    clearInterval(interval)
    interval = null;
    count = 0;
    secNum.innerHTML = count;
})


 
//converter

const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const euroInput = document.querySelector('#euro')
const jpyInput = document.querySelector('#jpy')

async function converter(element) {
  element.oninput = async () => {
    try {
      const response = await fetch('../data/converter.json')
      if(!response.ok) throw new Error('Ошибка загрузки')
      const data = await response.json()
      const {euro, usd, jpy} = data
      if (element.value === '') {
          somInput.value = '';
          usdInput.value = '';
          euroInput.value = '';
          jpyInput.value = '';

          return;
        }
        if(element.id === 'som') {
          usdInput.value = (element.value / usd).toFixed(2);
          euroInput.value = (element.value/ euro).toFixed(2);
          jpyInput.value = (element.value/ jpy).toFixed(2);
        } else if (element.id === 'usd'){
          somInput.value = (element.value * usd).toFixed(2)
          euroInput.value = ((element.value * usd) / euro).toFixed(2);
          jpyInput.value = ((element.value * usd) / jpy).toFixed(2);
        } else if (element.id === 'euro'){
          somInput.value = (element.value * euro).toFixed(2)
          usdInput.value = ((element.value * euro) / usd).toFixed(2)
          jpyInput.value = ((element.value * euro) / jpy).toFixed(2)
        } else if (element.id === 'jpy'){
          somInput.value = (element.value * jpy).toFixed(2)
          usdInput.value = ((element.value * jpy) / usd).toFixed(2)
          euroInput.value = ((element.value * jpy) / euro).toFixed(2)
        }
    } catch (error) {
      console.error("что-то пошло не так:", error);
    }
  }
}

converter(somInput)
converter(usdInput)
converter(euroInput)
converter(jpyInput)

// converter = (element) => {
//   element.oninput = () => {
//     const req = new XMLHttpRequest()
//   req.open('GET', '../data/converter.json')
//   req.setRequestHeader('Content-Type', 'application/json')
//   req.send()

//   req.onload = () => {
//       if(req.status >= 200 && req.status < 400) {
//       const data = JSON.parse(req.response)
//       const {euro, usd} = data
//       if (element.value === '') {
//           somInput.value = '';
//           usdInput.value = '';
//           euroInput.value = '';

//           return;
//         }
//         if(element.id === 'som') {
//           usdInput.value = (element.value / usd).toFixed(2);
//           euroInput.value = (element.value/ euro).toFixed(2);
//         } else if (element.id === 'usd'){
//           somInput.value = (element.value * usd).toFixed(2)
//           euroInput.value = ((element.value * usd) / euro).toFixed(2);
//         } else if (element.id === 'euro'){
//           somInput.value = (element.value * euro).toFixed(2)
//           usdInput.value = ((element.value * euro) / usd).toFixed(2)
//         }
//       }
//     }
//   }
// }


