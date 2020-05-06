const square = document.getElementById("square");

const timeout = 500;
let timeoutId;

function logEventType(e) {
  console.log(e.type);
}

function touchAndHold(element) {
  console.log("touchAndHold");
  square.classList.toggle("touchedAndHeld");
}

function handleMouseDown(e) {
  logEventType(e);
  timeoutId = setTimeout(() => touchAndHold(e.currentTarget), timeout);
}

function handleMouseUp(e) {
  logEventType(e);
  clearTimeout(timeoutId);
  square.classList.toggle("touchedAndHeld");
}

function handleMouseLeave(e) {
  logEventType(e);
  clearTimeout(timeoutId);
}

square.addEventListener("mousedown", handleMouseDown);
square.addEventListener("mouseup", handleMouseUp);
square.addEventListener("mouseleave", handleMouseLeave);
