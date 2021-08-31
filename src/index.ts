import "./style.css";

import Lift from "./modules/Lift";

import { SequenceStepType } from "./types";
import Passenger from "./modules/Passenger";

const sequence: SequenceStepType[] = [
  {
    turn: 1,
    passengers: [new Passenger(1, 3), new Passenger(2, 3), new Passenger(3, 1)],
  },
  {
    turn: 2,
    passengers: [new Passenger(1, 3)],
  },
];

function main() {
  const liftEl = document.getElementById("lift");

  const newLift = new Lift({
    startingFloor: 1,
    numberOfFloors: 3,
    el: liftEl,
    sequence,
  });

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
