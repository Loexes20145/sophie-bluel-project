import { cloneTemplate } from "./function/dom.js";
import { filterGallery } from "./function/filter.js";

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
      itemDiv.classList.add(item.class)
      const image = itemDiv.querySelector("img")
      image.src = item.url
      image.alt = `Image de ${item.title}`
      const imageTitle = itemDiv.querySelector("span")
      imageTitle.innerText = item.title
      
      gallery.appendChild(itemDiv)
    });
  })
  .then (() => {
    const filter = cloneTemplate('filterLayout').firstElementChild

    const filterAllBtn = filter.querySelector(".filterAll")
    filterAllBtn.addEventListener("click", (e) => {
      const items = gallery.querySelectorAll(".work")
      for (let elt of items) {
        elt.style.display = "flex"
      }
    })

    const filterItemsBtn = filter.querySelector(".filterItems")
    filterItemsBtn.addEventListener("click", (e) => {
      filterGallery('item')
    })

    const filterApartsBtn = filter.querySelector(".filterAparts")
    filterApartsBtn.addEventListener("click", (e) => {
      filterGallery('apartment')
    })

    const filterHotelsBtn = filter.querySelector(".filterHotels")
    filterHotelsBtn.addEventListener("click", (e) => {
      filterGallery('hotelResto')
    })

    document.querySelector('.projectSection').insertBefore(filter, gallery)
  })
  .catch((error) => {
    console.error("Une erreur est survenue: " + error)
  })
