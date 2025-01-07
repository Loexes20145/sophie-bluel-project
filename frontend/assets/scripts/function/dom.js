export function cloneTemplate (id) {
  return document.getElementById(id).content.cloneNode(true)
}

export function handleEditMode () {
  const editHeader = document.querySelector(".editHeader")
  editHeader.classList.toggle("active")

  const editSpan = document.querySelector(".editSpan")
  editSpan.classList.toggle("active")
}