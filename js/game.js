const player = document.querySelector('.player');
let speed = 2;
let ticking = false;
const BUTTONS = {
  X: 0,
  CIRCLE: 1,
  SQUARE: 2,
  TRIANGLE: 3,
  L1: 4,
  L2: 5,
  R1: 6,
  R2: 7,
  SHARE: 8,
  OPTIONS: 9,
  UP: 12,
  DOWN: 13,
  LEFT: 14,
  RIGHT: 15,
};


window.addEventListener('gamepadconnected', (e) => {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);

    startPolling();

    console.log(navigator.getGamepads()[0]);
});

function movePlayer(x, y) {
  const playerPosition = {
    x: getValue($(player).css('left')) + (x * speed) || 0,
    y: getValue($(player).css('top')) + (y * speed) || 0,
  };

  $(player).css('left', `${playerPosition.x}px`);
  $(player).css('top', `${playerPosition.y}px`);
} 

function startPolling() {
  if (!ticking) {
    ticking = true;
    tick();
  }
}

function stopPolling() {
  ticking = false;
}

function pollStatus() {
  const buttons = navigator.getGamepads()[0].buttons;
  let vector = { x: 0, y: 0 };
  
  if (buttons[BUTTONS.LEFT].value) vector.x = -1;
  if (buttons[BUTTONS.RIGHT].value) vector.x = 1;
  if (buttons[BUTTONS.UP].value) vector.y = -1;
  if (buttons[BUTTONS.DOWN].value) vector.y = 1;
  if (buttons[BUTTONS.X].value) {
    speed = 10;
  } else {
    speed = 2;
  }

  movePlayer(vector.x, vector.y);
}

function scheduleNextTick() {
  if (ticking) {
    window.requestAnimationFrame(tick);
  }   
}

function tick() {
  pollStatus();
  scheduleNextTick();
}


function getValue(str) {
  return Number(str.slice(0, str.length - 2));
}