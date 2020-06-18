// Variable speichert die 3 möglichen Auswahlmöglichkeiten
const choices = document.querySelectorAll('.choice');
// Variable speichert den Punktestand 
const score = document.getElementById('score');
// Variable 
const result = document.getElementById('result');

const restart = document.getElementById('restart');

const modal = document.querySelector('.modal');

// Initialer Zustand
const scoreboard = {
  player: 0,
  computer: 0
};

// Spiellogik 
function play(e) {
  restart.style.display = 'inline-block';
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
}

// Get computers choice
function getComputerChoice() {
    // Math Objekt spuckt eine zufällige Zahl zwischen 0 und 1 aus
    // wenn die Zahl kleiner 0.34 ist --> Cube
    // wenn die Zahl kleiner gleich 0.67 ist --> Toilet Paper
    // ansonsten Cut 
  const rand = Math.random();
  if (rand < 0.34) {
    return 'cube';
  } else if (rand <= 0.67) {
    return 'toilet-paper';
  } else {
    return 'cut';
  }
}

// Gewinner ermitteln
// Spieler kann zwischen Cube, Toilet Paper und Cut (Schere) wählen
// Jenachdem was der Gegner wählt wird darauf basierend der Gewinner ermittelt
function getWinner(p, c) {
  if (p === c) {
    return 'draw';
  } else if (p === 'cube') {
    if (c === 'toilet-paper') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'toilet-paper') {
    if (c === 'cut') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'cut') {
    if (c === 'cube') {
      return 'computer';
    } else {
      return 'player';
    }
  }
}

function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    // Erhöhe den Score des Spielers 
    scoreboard.player++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-win">Gewonnen!</h1>
      <i class="fas fa-${computerChoice} fa-10x"></i>
      <p>Der Gegner hat <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong> gewählt</p>
    `;
  } else if (winner === 'computer') {
    // Inc computer score
    scoreboard.computer++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-lose">Verloren!</h1>
      <i class="fas fa-${computerChoice} fa-10x"></i>
      <p>der Gegner hat <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong> gewählt</p>
    `;
  } else {
    result.innerHTML = `
      <h1>Unentschieden!</h1>
      <i class="fas fa-${computerChoice} fa-10x"></i>
      <p>Der Gegner hat ebenfalls <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong> gewählt</p>
    `;
  }
  // Show score
  score.innerHTML = `
    <p>Spieler: ${scoreboard.player}</p>
    <p>Gegner: ${scoreboard.computer}</p>
    `;

  modal.style.display = 'block';
}

// Restart game
function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Spieler: 0</p>
    <p>Gegner: 0</p>
  `;
}

// Clear modal
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);
