
import { cloneTemplate, handleEditMode } from "./function/dom.js";
import { listAll, listByCategories, handleWorkClass } from "./function/filter.js";

listAll ()

listByCategories ()

getWorks ()

async function getWorks () {

  fetch('http://localhost:5678/api/works', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`)
      }
      console.log("%cResponse OK! Travaux récupérés", "background-color: green", response.status)
      return response.json()
    })
    .then((worksData) => {
      
      worksData.forEach(work => {
        const itemDiv = cloneTemplate('workItem').firstElementChild
  
        const workClass = handleWorkClass(work.categoryId)
        itemDiv.classList.add(workClass)
  
        const image = itemDiv.querySelector("img")
        image.src = work.imageUrl
        image.alt = `Image de ${work.title}`
        image.crossOrigin = "anonymous"
  
        const imageTitle = itemDiv.querySelector("span")
        imageTitle.innerText = work.title
        
        gallery.appendChild(itemDiv)
      })
    })
    .catch((error) => {
      console.error(error)
    })

}


// EventListener to handle edit mode
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  // If User is conected activate edit mode
  if (!token) {
    console.log("Utilisateur déconnecté")
  } else {
    console.log("Utilisateur connecté.");
    // handleEditMode()
  }
});