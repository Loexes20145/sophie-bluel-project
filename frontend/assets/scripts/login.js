
const form = document.getElementById('loginForm')
const loginBtn = document.getElementById('loginBtn')

const userMail = "sophie.bluel@test.tld"
const userPassword = "S0phie"

// loginBtn.disabled = true

const validEmail = (email) => {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (/* !regex.test(email) || */ !(email === userMail)) {
    throw new Error ("L'email n'est pas valide.")
  }
  if (email === userMail) {
    console.log("Email validé")
  }
}

const validPassword = (password) => {
  let regex = /^[a-zA-Z0-9._%+-]{2,}$/
  if (/* !regex.test(password) || */ !(password === userPassword)) {
    throw new Error ("Le mot de passe n'est pas valide.")
  }
  if (password === userPassword) {
    console.log("Mot de Passe validé")
  }
}

const displayErrorMessage = (message) => {
    
  let spanErrorMessage = document.getElementById("erreurMessage")
  let spanMessageList = document.querySelectorAll('.loginMessage')
  for (let item of spanMessageList) {
    item.remove()
  }

  if (!spanErrorMessage) {
      spanErrorMessage = document.createElement("span")
      spanErrorMessage.id = "errorMessage"
      spanErrorMessage.classList.add("errorMessage")
      spanErrorMessage.classList.add("loginMessage")
      
      form.prepend(spanErrorMessage)
  }
  
  spanErrorMessage.innerText = message
}

const displayHelloMessage = (message) => {
    
  let spanHelloMessage = document.getElementById("helloMessage")
  let spanMessageList = document.querySelectorAll('.loginMessage')
  for (let item of spanMessageList) {
    item.remove()
  }

  if (!spanHelloMessage) {
      spanHelloMessage = document.createElement("span")
      spanHelloMessage.id = "helloMessage"
      spanHelloMessage.classList.add("helloMessage")
      spanHelloMessage.classList.add("loginMessage")
      
      form.prepend(spanHelloMessage)
  }
  
  spanHelloMessage.innerText = message
}

function handleLogin () {
  try {
    let baliseEmail = document.getElementById('email')
    let email = baliseEmail.value
    validEmail(email)

    let balisePassword = document.getElementById('password')
    let password = balisePassword.value
    validPassword(password)

    displayHelloMessage("Bienvenue Sophie Bluel")

  } catch (error) {
    displayErrorMessage(error.message)
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  handleLogin()

  const formData = new FormData(form)
  const formPayload = Object.fromEntries(formData.entries())

  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(formPayload),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error (`${response.status} - ${response.statusText}`)
    }
    return response.json()
  })
  .then((data) => {
    console.log('%cRéponse serveur: ', 'color: green;', data)
    localStorage.setItem("token", data.token)
    location.href = "/frontend/home.html"
  })
  .catch((error) => {
    console.error(error)
  })

})
