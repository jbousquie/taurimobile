import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'


import {
  checkPermissions,
  requestPermissions,
  getCurrentPosition,
  watchPosition
} from '@tauri-apps/plugin-geolocation'


let permissions = await checkPermissions()


if (
  permissions.location === 'prompt' ||
  permissions.location === 'prompt-with-rationale'
) {
  permissions = await requestPermissions(['location'])
}




document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <p id="geolocation">
    </p>
  </div>
`;


if (permissions.location === 'granted') {
  const pos = await getCurrentPosition();

   document.querySelector<HTMLParagraphElement>('#geolocation')!.textContent = `Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`
  
   await watchPosition(
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    (pos) => {
      if (pos !== null) {
        document.querySelector<HTMLParagraphElement>('#geolocation')!.textContent = `Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`
      }
    }
  )
}



setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
