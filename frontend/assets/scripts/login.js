
const form = document.getElementById('loginForm')
const loginBtn = document.getElementById('loginBtn')

const userMail = "sophie.bluel@test.tld"
const userPassword = "S0phie"

// loginBtn.disabled = true

const validCredentials = (email, password) => {
  if (!(email === userMail) || !(password === userPassword)) {
    throw new Error ("Email ou mot de passe invalide")
  }
  else {
    console.log("Identifiants valides")
  }
}

const loginMessage = (message, messageStyle) => {
  
  let spanMessage = document.getElementById("loginMessage")

  if (!spanMessage) {
    spanMessage = document.createElement("span")
    spanMessage.id = "loginMessage"
    form.prepend(spanMessage)
  }

  spanMessage.classList = [messageStyle]
  spanMessage.innerText = message
}

function handleLogin () {
  try {
    let baliseEmail = document.getElementById('email')
    let email = baliseEmail.value

    let balisePassword = document.getElementById('password')
    let password = balisePassword.value

    validCredentials(email, password)

    loginMessage("Bienvenue Sophie Bluel", "helloMessage")

  } catch (error) {
    loginMessage(error.message, "errorMessage")
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
    sessionStorage.setItem("token", data.token)
    location.href = "/frontend/home.html"
  })
  .catch((error) => {
    console.error(error)
  })
    

})
