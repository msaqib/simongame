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

for (let i = 0 ; i < sequenceLength ; i++) {
    order.push(allButtons[Math.floor(Math.random()*allButtons.length)])
}

async function flashAll(order) {
    for (const button of order) {
        await flash(button)
    }
    document.querySelector('.buttons').classList.add('clickable')
}

flashAll(order)