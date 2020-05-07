const root = document.documentElement;
const container = document.getElementById("container");
const containerRect = container.getBoundingClientRect();
const square = document.getElementById("square");
const timeout = 0;
let isDragging = false;
let timeoutId;
let x = 0;
let y = 0;
let dragOffsetX = 0;
let dragOffsetY = 0;

document.documentElement.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      console.log("---");
      break;
    case "c":
      console.clear();
      break;
  }
});

document.addEventListener("blur", (e) => {
  stopDragging();
});

document.addEventListener("visibilitychange", (e) => {
  console.log(`visibilitychange; visibilityState: ${document.visibilityState}`);

  if (document.visibilityState === "hidden") {
    stopDragging();
  }
});

document.body.addEventListener("mousemove", (e) => {
  // logEvent(e);
  // console.log(`clientX/Y: ${e.clientX}/${e.clientY}`);
  if (isDragging) {
    x = e.clientX - containerRect.x - dragOffsetX;
    y = e.clientY - containerRect.y - dragOffsetY;
    root.style.setProperty("--x", `${x}px`);
    root.style.setProperty("--y", `${y}px`);
  }
  // console.log(`pageX/Y: ${e.pageX}/${e.pageY}`);
  // console.log(`screenX/Y: ${e.screenX}/${e.screenY}`);
  // console.log(`target.id: ${e.target.id}`);
  // console.log(`offset; x: ${e.offsetX}, y: ${e.offsetY}`);
});

function logEvent(e) {
  console.log(
    `${e.type}, target: ${e.target.id}, currentTarget: ${e.currentTarget.id}, timeStamp: ${e.timeStamp}`
  );
}

function logEventType(e) {
  console.log(e.type);
}

function setIsDragging(value) {
  isDragging = value;
}

function setDraggingStyle(element, value) {
  element.classList.toggle("dragging", value);
}

function startDragging(element, offset) {
  console.log("startDragging");
  [dragOffsetX, dragOffsetY] = offset;
  setIsDragging(true);
  setDraggingStyle(element, true);
}

function stopDragging() {
  console.log("stopDragging");
  clearTimeout(timeoutId);
  setIsDragging(false);
  setDraggingStyle(square, false);
}

function handleMouseDown(e) {
  logEventType(e);
  const element = e.currentTarget;
  const offset = [e.offsetX, e.offsetY];
  timeoutId = setTimeout(startDragging.bind(null, element, offset), timeout);
}

function handleMouseUp(e) {
  logEventType(e);
  stopDragging();
}

function handleMouseOut(e) {
  logEvent(e);

  if (isDragging) {
    stopDragging();
  }
}

function handleMouseLeave(e) {
  logEvent(e);

  if (isDragging) {
    // stopDragging();
  }
}

function handleMouseEnter(e) {
  logEvent(e);
}

function handleMouseOver(e) {
  e.stopPropagation();
  logEvent(e);
}

function handleMouseMove(e) {
  logEvent(e);
  e.stopPropagation();

  if (isDragging) {
    x = e.clientX - containerRect.x - dragOffsetX;
    y = e.clientY - containerRect.y - dragOffsetY;
    root.style.setProperty("--x", `${x}px`);
    root.style.setProperty("--y", `${y}px`);
  }
}

square.addEventListener("mousedown", handleMouseDown);
square.addEventListener("mouseup", handleMouseUp);
document.body.addEventListener("mouseenter", handleMouseEnter);
// document.body.addEventListener("mouseover", handleMouseOver);
// container.addEventListener("mouseover", handleMouseOver);
// container.addEventListener("mouseout", handleMouseOut);
// square.addEventListener("mouseout", handleMouseOut);
// container.addEventListener("mouseleave", handleMouseLeave);
// square.addEventListener("mouseleave", handleMouseLeave);
// container.addEventListener("mousemove", handleMouseMove);
document.body.addEventListener("mouseleave", handleMouseLeave);
