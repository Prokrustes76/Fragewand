let ctx, advent, fragen = [], zahlen = []
    width = 800, height = 450

window.onload = function() {
  ctx = document.getElementById('C').getContext('2d')
  ctx.texBaseline = 'middle'

  for (let i = 0; i < 24; i++)
    zahlen.push(i)
  for (let i = 0; i < 24; i++) 
    fragen[i] = new Frage(i)

  advent = new Image()
  advent.src = './rsc/Advent.jpg'

  setTimeout(draw, 200)
}

document.addEventListener('mousedown', click)

function click(event) {
  let x = Math.floor((event.clientX - 8) / width * 6)
  let y = Math.floor((event.clientY - 8) / height * 4)

  if (x < 0 || x > 5 || y < 0 || y > 3)
    return
  
  fragen [y * 6 + x].open = true
  draw()

}

function draw() {
  ctx.drawImage(advent, 0, 0)
  for (let f of fragen)
    f.show()
}

function write(text, x, y, size, col, align) {
  ctx.font = `${size}px Arial`
  ctx.fillStyle = col
  ctx.textAlign = align
  ctx.fillText(text, x, y)
}

class Frage {
  constructor(i) {
    this.nr       = this.getNr()
    this.open     = false
    this.x        = (i % 6) * width / 6
    this.y        = Math.floor(i / 6) * height / 4
    this.content  = this.getContent(i)

  }

  getContent(i) {
    return [
      ['In welchem Land', 'werden Geschenke', 'von einer Hexe', 'überbracht?'],
      ['Der Ausbildungs-', 'rahmenplan'],
      ['Fachliche Eignung', 'des Ausbilders'],
      ['Dauer und Zweck', 'der Probezeit'],
      ['Die Führungsstile'],
      ['Die Lerntypen'],
      ['Die Schlüssel-', 'kompetenzen'],
      ['Das Hauptziel', 'der Ausbildung'],
      ['Die vier Ebenen', 'des Modells von', 'Schulz von Thun'],
      ['Welche Oberbegriffe', 'gibt es bei den', 'Ausbildungs-', 'methoden?'],

      ['Was verstecken', 'Norweger vor', 'Weihnachten?'],
      ['Zentrale und', 'dezentrale', 'Ausbildung'],
      ['Die', '4-Stufen-', 'Methode'],
      ['Das Lehrgespräch'],
      ['Die wichtigsten','Feedback-Regeln'],
      ['Fein-, Grob- und', 'Richtlernziele'],
      ['Monoberufe'],
      ['Hierarchien der', 'Rechtsquellen'],
      ['Gesellschaftlicher', 'Nutzen der', 'Berufsausbildung'],
      ['Zahlenmäßiges', 'Verhältnis der', 'Azubis und', 'der Fachkräfte'],

      ['Die Ausbildung', 'im Verbund'],
      ['Die außerbetrieb-', 'liche Ausbildung'],
      ['Notwendige Eignung', 'des Ausbildenden'],
      ['Wo wird am', 'Weihnachtsabend', 'immer ein Gedeck', 'mehr aufgelegt?']

    ][i] || ''
  }

  getNr() {
    let zuf = Math.floor(Math.random() * zahlen.length)
    let wert = zahlen[zuf]
    zahlen.splice(zuf, 1)
    return wert + 1
  }

  show(x = this.x, y = this.y) {
    ctx.strokeStyle = 'white'
    ctx.strokeRect(x, y, width / 6, height / 4)

    if (!this.open) {
      write(this.nr, x + width / 6 - 5, y + height / 4 - 5, 20, 'white', 'right')
    }
    else {
      ctx.fillStyle = 'rgba(255, 255, 255, .7)'
      ctx.fillRect(x, y, width / 6, height / 4)
      for (let i = 0; i < this.content.length; i++) {
        y = this.y + height / 8 - 11 * this.content.length + 15
        write(this.content[i], x + width / 12, y + i * 22, 14, 'black', 'center')
      }
    }
  }
}