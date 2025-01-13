
import { cloneTemplate, handleEditMode } from "./function/dom.js";
import { listByCategories, handleWorkClass } from "./function/filter.js";

let token = sessionStorage.getItem("token")


listByCategories ()

getWorks (gallery)

function deleteWork (workId) {

  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
    .then((response) => {
      if(!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`)
      }
      return response.json()
    })
    .catch((error) => {
      console.log(error)
    })
}

async function getWorks (divElement, deletable=false) {

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
        image.crossOrigin = ""

        const deleteBtn = itemDiv.querySelector(".workDeleteBtn")
        if (deletable) {
          deleteBtn.disabled = false
          deleteBtn.addEventListener("click", () => {deleteWork(work.id)})
        } else {
          deleteBtn.remove()
        }
  
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
  const darkOverlay = document.createElement("div")
  darkOverlay.classList.add("dark-overlay")
  document.querySelector("body").append(darkOverlay)

  darkOverlay.addEventListener("click", (e) => {
    hideEditPopup()
  })

  const editPopup = document.querySelector(".editPopup")
  const editGallery = document.querySelector(".editPopup__Gallery")
  editGallery.innerHTML = ""

  getWorks(editGallery, true)

  editPopup.classList.toggle("active")

}

function hideEditPopup () {
  const editPopup = document.querySelector(".editPopup")

  editPopup.classList.toggle("active")

  document.querySelector(".dark-overlay").remove()
}

function handleEditWork () {
  document.querySelector(".editPopup__Btn").remove()

  document.querySelector(".editPopup__Validate").classList.toggle("active")

  document.querySelector(".editPopup__Header").innerText = "Ajout Photo"

  const editGallery = document.querySelector(".editPopup__Gallery")
  editGallery.innerHTML = ""


  const form = document.createElement("form")
  form.classList.add("editPopup__Form")

  const editUploadBox = document.createElement("div")
  editUploadBox.classList.add("editPopup__Form__UploadBox")
  editUploadBox.id = "upload-box"
  editUploadBox.innerHTML = `
    <input id="image-upload" type="file" accept="image/*" class="editPopup__Form__Image">
    <img src="/frontend/assets/images/image.svg" alt="Upload Icon" class="icon">
    <label for="image-upload" class="upload-label">+ Ajouter Photo</label>
    <span class="upload-text">jpg, png : 4mo max</span>
  `
  form.append(editUploadBox)

  const labelTitle = document.createElement("label")
  labelTitle.innerText = "Titre"
  form.append(labelTitle)

  const titleInput = document.createElement("input")
  titleInput.classList.add("editPopup__Form__Title", "editPopup__Form__Field", "input-text")
  form.append(titleInput)

  const labelCategory = document.createElement("label")
  labelCategory.innerText = "Catégorie"
  form.append(labelCategory)

  const categoryInput = document.createElement("select")
  categoryInput.id = "category-select"
  categoryInput.innerHTML = `
      <option value=""></option>
      <option value="1">Objets</option>
      <option value="2">Appartements</option>
      <option value="3">Hotels & Restaurants</option>
  `
  categoryInput.classList.add("editPopup__Form__Category", "editPopup__Form__Field")
  form.append(categoryInput)

  editGallery.append(form)
}

function addWork () {
  const imageFile = document.querySelector(".editPopup__Form__Image").files[0]
  const title = document.querySelector(".editPopup__Form__Title").value
  const category = document.querySelector(".editPopup__Form__Category").value

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

  // If User is conected activate edit mode
  if (!token) {
    console.log("Utilisateur déconnecté")
  } else {
    console.log("Utilisateur connecté.");
    handleEditMode()
  }
});