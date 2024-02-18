topRight = document.getElementById('1')
bottomRight = document.getElementById('2')
bottomLeft = document.getElementById('3')
topLeft = document.getElementById('4')

function flash(button) {
    return new Promise( (resolve, reject) => {
        button.classList.add('active')
        const onTime = 1000
        const offTime = 250
        setTimeout(()=> {
            button.classList.remove('active')
            setTimeout(()=> {
                resolve()
            }, offTime)
        }, onTime)
    })
}

const allButtons = [topRight, bottomRight, bottomLeft, topLeft]

let order = []

const sequenceLength = 4

function initialize() {
    for (let i = 0 ; i < sequenceLength ; i++) {
        order.push(allButtons[Math.floor(Math.random()*allButtons.length)])
    }    
    flashAll(order)
}

initialize()

async function flashAll(order) {
    for (const button of order) {
        await flash(button)
    }
    enableClicks()
}

const buttonClicked = event => {
    if (event.currentTarget === order.shift()) {
        if (order.length === 0) {
            disableClicks()
            const won = document.createElement('div')
            const p = document.createElement('p')
            const b = document.createElement('button')
            b.innerText = 'Play again'
            b.onclick = again
            p.innerText = 'You won'
            won.appendChild(p)
            won.appendChild(b)
            won.classList.add('modal')
            document.body.appendChild(won)
        }
    }
    else {
        console.log('You lose')
        disableClicks()
    }
}

function enableClicks() {
    document.querySelector('.buttons').classList.add('clickable')
    allButtons.forEach( button => button.addEventListener('click', buttonClicked))
} 

function disableClicks() {
    document.querySelector('.buttons').classList.remove('clickable')
    allButtons.forEach( button => button.removeEventListener('click', buttonClicked))
}

function again() {
    const modal = document.querySelector('.modal')
    modal.remove()
    initialize()
}