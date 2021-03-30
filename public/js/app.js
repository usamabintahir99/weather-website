const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const messageThree = document.querySelector("#message-3")
const messageFour = document.querySelector("#message-4")
const messageFive = document.querySelector("#message-5")
const titleOne = document.querySelector("#title-1")
const titleTwo = document.querySelector("#title-2")
const titleThree = document.querySelector("#title-3")
const titleFour = document.querySelector("#title-4")
const titleFive = document.querySelector("#title-5")
const degreeCelsius = [...document.getElementsByClassName("symbol")]

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const location = search.value

  messageOne.textContent = "Loading..."

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
        messageTwo.textContent = ""
        messageThree.textContent = ""
        messageFour.textContent = ""
        messageFive.textContent = ""

        titleOne.style.visibility = titleTwo.style.visibility = titleThree.style.visibility = titleFour.style.visibility = titleFive.style.visibility =
          "hidden"

        degreeCelsius.map((x) => (x.style.visibility = "hidden"))
      } else {
        const arr = data.forecast.split(",")
        messageOne.textContent = data.location
        messageTwo.textContent = arr[0]
        messageThree.textContent = arr[1]
        messageFour.textContent = arr[2]
        messageFive.textContent = arr[3][0].toUpperCase() + arr[3].substring(1)

        titleOne.style.visibility = titleTwo.style.visibility = titleThree.style.visibility = titleFour.style.visibility = titleFive.style.visibility =
          "visible"

        degreeCelsius.map((x) => (x.style.visibility = "visible"))
      }
    })
  })
})
