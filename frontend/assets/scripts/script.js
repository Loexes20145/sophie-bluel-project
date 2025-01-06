
import { cloneTemplate, handleEditMode } from "./function/dom.js";
import { listAll, listByCategories, handleWorkClass } from "./function/filter.js";

listAll ()

listByCategories ()

getWorks (gallery)

async function getWorks (divElement) {

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
        
        divElement.appendChild(itemDiv)
      })
    })
    .catch((error) => {
      console.error(error)
    })

}

function showEditPopup () {
  const editPopup = document.querySelector(".editPopup")
  const editGallery = document.querySelector(".editPopup__Gallery")
  editGallery.innerHTML = ""

  getWorks(editGallery)

  editPopup.classList.toggle("active")
}

function hideEditPopup () {
  const editPopup = document.querySelector(".editPopup")

  editPopup.classList.toggle("active")
}

function handleEditWork () {
  const editPopup = document.querySelector(".editPopup")

  const editBtn = document.querySelector(".editPopup__Btn")
  editBtn.remove()

  const editValidate = document.querySelector(".editPopup__Validate")
  editValidate.classList.toggle("active")

  const editHeader = document.querySelector(".editPopup__Header")
  editHeader.innerText = "Ajout Photo"

  const editGallery = document.querySelector(".editPopup__Gallery")
  editGallery.innerHTML = ""


  const form = document.createElement("form")
  form.classList.add("editPopup__Form")

  const editImage = document.createElement("input")
  editImage.type = 'file'
  editImage.classList.add("editPopup__Form__Image")
  form.append(editImage)

  const labelTitle = document.createElement("label")
  labelTitle.innerText = "Titre"
  form.append(labelTitle)

  const titleInput = document.createElement("input")
  titleInput.classList.add("editPopup__Form__Title")
  form.append(titleInput)

  const labelCategory = document.createElement("label")
  labelCategory.innerText = "Catégorie"
  form.append(labelCategory)

  const categoryInput = document.createElement("input")
  categoryInput.classList.add("editPopup__Form__Category")
  form.append(categoryInput)

  editGallery.append(form)
}

function addWork () {
  const imageFile = document.querySelector(".editPopup__Form__Image").files[0]
  const title = document.querySelector(".editPopup__Form__Title").value
  const category = document.querySelector(".editPopup__Form__Category").value

  const token = localStorage.token

  const formBody = new FormData()
  formBody.append("image", imageFile)
  formBody.append("title", title)
  formBody.append("category", category)
  
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formBody,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error (`${response.status} - ${response.statusText}`)
      }
      console.log(response.json())
      return response.json()
    })
    .then((data) => {
      console.log("Réponse serveur : ", data)
    })
    .catch((error) => {
      console.error(error)
    })

}

document.querySelector(".editCta").addEventListener("click", (e) => {
  showEditPopup()
})

document.querySelector(".editPopup__Btn").addEventListener("click", (e) => {
  handleEditWork()
})

document.querySelector(".editPopup__Validate").addEventListener("click", (e) => {
  addWork ()
})

document.querySelector(".closePopup").addEventListener("click", (e) => {
  hideEditPopup()
})


// EventListener to handle edit mode
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  // If User is conected activate edit mode
  if (!token) {
    console.log("Utilisateur déconnecté")
  } else {
    console.log("Utilisateur connecté.");
    handleEditMode()
  }
});