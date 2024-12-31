export function filterGallery (critera) {
  const items = gallery.querySelectorAll(".work")
  for (let element of items) {
    element.style.display = "flex"
    const elementClass = [...element.classList]
    if (!elementClass.includes(critera)) {
      element.style.display = "none"
    }
  }
}