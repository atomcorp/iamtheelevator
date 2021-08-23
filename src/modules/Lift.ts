import Building from "./Building";

import Passenger from "./Passenger";

class Lift extends Building {
  #floor: number;
  #domEl: HTMLElement;
  #passengers: Passenger[];
  #points: number;

  constructor(startingFloor: number, numberOfFloors: number, el: HTMLElement) {
    super(numberOfFloors);
    this.#floor = startingFloor;
    this.#domEl = el;
    this.#passengers = [];
    this.#points = 0;
  }

  #renderMoveLift(nextFloor: number): void {
    const elRef = this.#domEl;
    this.#domEl.remove();
    const floorEl = this.returnLiftFloorEl(nextFloor);
    floorEl.appendChild(elRef);
    this.#domEl = elRef;
  }

  moveUp(): void {
    if (this.#floor < this.floors) {
      const nextFloor = this.#floor + 1;
      this.#floor = nextFloor;
      this.#renderMoveLift(nextFloor);
    }
  }

  moveDown(): void {
    if (this.#floor > 1) {
      const nextFloor = this.#floor - 1;
      this.#floor = nextFloor;
      this.#renderMoveLift(nextFloor);
    }
  }

  openDoors(): void {
    const waitingPassengerDomEls = this.returnCustomerElsFromFloorEl(
      this.#floor
    );
    if (this.#passengers.length > 0) {
      this.#passengers = this.#passengers.filter((passenger) => {
        if (passenger.requestedFloor === this.#floor) {
          this.#points += passenger.rating;
          return false;
        }
        return true;
      });
    }
    if (waitingPassengerDomEls.length > 0) {
      const waitingPassengers = waitingPassengerDomEls.map((customerDomEl) => {
        const params = this.parseCustomerParamsFromCustomerDomEl(customerDomEl);
        this.removePassengerFromFloor(this.#floor, customerDomEl);
        const newCustomer = new Passenger(this.#floor, params.requestedFloor);
        return newCustomer;
      });
      // add customer to the lift
      this.#passengers = [...this.#passengers, ...waitingPassengers];
    }
    this.#renderPassengersInLift();
    this.#renderPoints();
  }

  #renderPassengersInLift(): void {
    const passengerDomEls = this.#passengers.map((passenger) => {
      const rootDomEl = document.createElement("span");
      rootDomEl.dataset.customer = "true";
      rootDomEl.dataset.requestedFloor = passenger.requestedFloor.toString();
      rootDomEl.innerText = `(🙋‍♂️: ${passenger.requestedFloor})`;
      return rootDomEl;
    });
    this.#domEl.innerHTML = "";
    this.#domEl.appendChild(document.createTextNode("["));
    passengerDomEls.forEach((passengerDomEl) => {
      this.#domEl.appendChild(passengerDomEl);
      this.#domEl.appendChild(document.createTextNode(","));
    });
    this.#domEl.appendChild(document.createTextNode("]"));
  }

  #renderPoints(): void {
    document.getElementById("points").innerText = this.#points.toString();
  }
}

export default Lift;
