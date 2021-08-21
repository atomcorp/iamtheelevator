import "./style.css";

import Lift from "./modules/Lift";

function main() {
  const liftEl = document.getElementById("lift");

  const newLift = new Lift(1, 3, liftEl);

  document.addEventListener("click", (e) => {
    const element = e.target as HTMLElement;
    if (element.id === "up") {
      newLift.moveUp();
    }
    if (element.id === "down") {
      newLift.moveDown();
    }
    if (element.id === "doors") {
      newLift.openDoors();
    }
  });
}

main();
