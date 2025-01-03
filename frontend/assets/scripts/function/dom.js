export function cloneTemplate (id) {
  return document.getElementById(id).content.cloneNode(true)
}

export function handleEditMode () {
  const edit = cloneTemplate("editLayout").firstElementChild
  const body = document.querySelector("body")
  body.prepend(edit)
}