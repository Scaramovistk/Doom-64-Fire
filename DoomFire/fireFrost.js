const firePixelsArray = []
let fireWidth = 100
let fireHeight = 50
let debug = false
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":7,"g":7,"b":31},{"r":7,"g":15,"b":47},{"r":1,"g":15,"b":71},{"r":7,"g":23,"b":87},{"r":7,"g":31,"b":103},{"r":7,"g":31,"b":199},{"r":7,"g":39,"b":143},{"r":7,"g":47,"b":159},{"r":7,"g":63,"b":175},{"r":7,"g":71,"b":191},{"r":7,"g":71,"b":199},{"r":7,"g":79,"b":223},{"r":7,"g":87,"b":233},{"r":7,"g":87,"b":233},{"r":7,"g":95,"b":215},{"r":7,"g":95,"b":215},{"r":15,"g":103,"b":215},{"r":15,"g":111,"b":207},{"r":15,"g":119,"b":207},{"r":15,"g":127,"b":207},{"r":23,"g":135,"b":207},{"r":23,"g":135,"b":199},{"r":23,"g":143,"b":199},{"r":31,"g":151,"b":199},{"r":31,"g":159,"b":191},{"r":31,"g":159,"b":191},{"r":39,"g":167,"b":191},{"r":39,"g":167,"b":191},{"r":47,"g":175,"b":191},{"r":47,"g":175,"b":183},{"r":47,"g":183,"b":183},{"r":55,"g":183,"b":183},{"r":111,"g":207,"b":207},{"r":159,"g":223,"b":233},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]


function start() {
  createFireDataStructure()
  createFireSource()

  setInterval(calculateFirePropagation, 10)
}

function createFireDataStructure() {
  const numberOfPixels = fireWidth * fireHeight

  for (let i = 0; i < numberOfPixels; i++) {
    firePixelsArray[i] = 0
  }
}

function calculateFirePropagation() {
  for (let column = 0; column < fireWidth; column++) {
    for (let row = 0; row < fireHeight; row++) {
      const pixelIndex = column + ( fireWidth * row )

      updateFireIntensityPerPixel(pixelIndex)
    }
  }

  renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex) {
  const belowPixelIndex = currentPixelIndex + fireWidth

  // below pixel index overflows canvas
  if (belowPixelIndex >= fireWidth * fireHeight) {
    return
  }

  const decay = Math.floor(Math.random() * 3)
  const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]
  const newFireIntensity =
    belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0

  firePixelsArray[currentPixelIndex + decay] = newFireIntensity
}

function renderFire() {
  let html = '<table cellpadding=0 cellspacing=0>'

  for (let row = 0; row < fireHeight; row++) {
    html += '<tr>'

    for (let column = 0; column < fireWidth; column++) {
      const pixelIndex = column + ( fireWidth * row )
      const fireIntensity = firePixelsArray[pixelIndex]
      const color = fireColorsPalette[fireIntensity]
      const colorString = `${color.r},${color.g},${color.b}`

      if (debug === true) {
        html += '<td>'
        html += `<div class="pixel-index">${pixelIndex}</div>`
        html += `<div style="color: rgb(${colorString})">${fireIntensity}</div>`
        html += '</td>'
      } else {
        html += `<td class="pixel" style="background-color: rgb(${colorString})">`
        html += '</td>'
      }
    }

    html += '</tr>'
  }

  html += '</table>'

  document.querySelector('#fireCanvas').innerHTML = html  
}

function createFireSource() {
  for (let column = 0; column <= fireWidth; column++) {
    const overflowPixelIndex = fireWidth * fireHeight
    const pixelIndex = (overflowPixelIndex - fireWidth) + column

    firePixelsArray[pixelIndex] = 36
  }
}

function destroyFireSource() {
  for (let column = 0; column <= fireWidth; column++) {
    const overflowPixelIndex = fireWidth * fireHeight
    const pixelIndex = (overflowPixelIndex - fireWidth) + column

    firePixelsArray[pixelIndex] = 0
  }
}

function increaseFireSource() {
  for (let column = 0; column <= fireWidth; column++) {
    const overflowPixelIndex = fireWidth * fireHeight
    const pixelIndex = (overflowPixelIndex - fireWidth) + column
    const currentFireIntensity = firePixelsArray[pixelIndex]

    if (currentFireIntensity < 36) {
      const increase = Math.floor(Math.random() * 14)
      const newFireIntensity =
        currentFireIntensity + increase >= 36 ? 36 : currentFireIntensity + increase

      firePixelsArray[pixelIndex] = newFireIntensity
    }
  }
}

function decreaseFireSource() {
  for (let column = 0; column <= fireWidth; column++) {
    const overflowPixelIndex = fireWidth * fireHeight
    const pixelIndex = (overflowPixelIndex - fireWidth) + column
    const currentFireIntensity = firePixelsArray[pixelIndex]

    if (currentFireIntensity > 0) {
      const decay = Math.floor(Math.random() * 14)
      const newFireIntensity =
        currentFireIntensity - decay >= 0 ? currentFireIntensity - decay : 0

      firePixelsArray[pixelIndex] = newFireIntensity
    }
  }
}

function toggleDebugMode() {
  if (debug === false) {
    fireWidth = 25
    fireHeight = 17
    debug = true
  } else {
    fireWidth = 60
    fireHeight = 40
    debug = false
  }

  createFireDataStructure()
  createFireSource()
}

start()
