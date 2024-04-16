// To get the deck Id using respective API
let deckId = ''
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    deckId = data.deck_id
  })
  .catch(err => {
    console.log(`error ${err}`)
  })

// To get two shiffled card displayed at deck
document.querySelector('button').addEventListener('click', drawTwo)

let p1count = 0;
let p2count = 0;

function drawTwo() {
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      document.querySelector('#player1').src = data.cards[0].image
      document.querySelector('#player2').src = data.cards[1].image
      let player1Val = convertToNum(data.cards[0].value)
      let player2Val = convertToNum(data.cards[1].value)
      let remainingVal = data.remaining;
      console.log(remainingVal)
      winDecider(remainingVal)

      if (player1Val > player2Val) {
        document.querySelector('h3').innerText = 'Player 1 wins'
        p1count += 1;
        console.log('p1 '+ p1count)
      }
      else if (player1Val < player2Val) {
        document.querySelector('h3').innerText = 'Player 2 wins'
        p2count += 1;
        console.log('p2 '+p2count)
      }
      else {
        document.querySelector('h3').innerText = 'Draw'
      }
      
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}

function convertToNum(val) {
  if (val === 'ACE') { return 14; }
  else if (val === 'KING') { return 13; }
  else if (val === 'QUEEN') { return 12; }
  else if (val === 'JACK') { return 11; }
  else { return Number(val); }
}

function winDecider(value){
if(value === 0){
  if(p1count > p2count){
    document.querySelector('.final').innerText = 'congratulationsss Player 1 you won'
  }
  else if(p1count < p2count){
    document.querySelector('.final').innerText = 'congratulationsss Player 2 you won'
  }
}
}

if (!localStorage.getItem('botScore')) {
  localStorage.setItem('botScore', 0)
}
document.querySelector('button').addEventListener('click', addAnotherOne)

function addAnotherOne() {

  let botScoreVal = Number(localStorage.getItem('botScore'))
  botScoreVal += 1
  localStorage.setItem('botScore', botScoreVal)

}