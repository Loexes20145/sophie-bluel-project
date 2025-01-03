import { cloneTemplate } from "./dom.js"

export function handleWorkClass (categoryId) {
  let category = ""

  switch (categoryId) {
    case 1:
      category = "Objet"
      break;

    case 2:
      category = "Appartement"
      break;
    
    case 3:
      category = "Hotel&Resto"
      break;
  
    default:
      break;
  }

  return category
}

export function filterGallery (category) {
  const items = gallery.querySelectorAll(".work")
  for (let element of items) {
    element.style.display = "flex"
    const elementClass = [...element.classList]
    if (!elementClass.includes(category)) {
      element.style.display = "none"
    }
  }
}

export function listAll () {
  const filterDiv = document.querySelector(".filter")
  const filterAllBtn = cloneTemplate("filterLayout").firstElementChild 
  filterAllBtn.innerText = "Tous"

  filterAllBtn.addEventListener("click", () => {filterGallery("work")})

  filterDiv.appendChild(filterAllBtn)

  // console.log(filterAllBtn)
}

export async function listByCategories () {

  fetch('http://localhost:5678/api/categories', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`)
    }
    console.log("%cResponse OK! Catégories récupérées", "background-color: green", response.status)
    return response.json()
  })
  .then((categories) => {
    // console.log(categories)
    categories.forEach(category => {
      filterBtn(category)
    });
  })

}

function filterBtn (category) {
  const filterDiv = document.querySelector(".filter")
  const filterObjectsBtn = cloneTemplate("filterLayout").firstElementChild 
  filterObjectsBtn.innerText = category.name

  const categoryCritera = handleWorkClass(category.id)

  filterObjectsBtn.addEventListener("click", () => {filterGallery(categoryCritera)})

  filterDiv.appendChild(filterObjectsBtn)

  // console.log(filterObjectsBtn)
}