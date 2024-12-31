import { cloneTemplate } from "./function/dom.js";

const gallery = document.getElementById("gallery")

const workData = "/frontend/assets/scripts/config/workData.json"

fetch(workData)
  .then(reponse => {
    if (reponse.ok) {
      return reponse.json()
    }
    throw new Error("Erreur lors du chargement des données ...");
  })
  .then(data => {
    data.forEach(item => {
      const itemDiv = cloneTemplate('workItem').firstElementChild
      const image = itemDiv.querySelector("img")
      image.src = item.url
      image.alt = `Image de ${item.title}`
      const imageTitle = itemDiv.querySelector("span")
      imageTitle.innerText = item.title
      
      gallery.appendChild(itemDiv)
    });
  })
