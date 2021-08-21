import Building from "./Building";

import Passenger from "./Passenger";

class Lift extends Building {
  #floor: number;
  #domEl: HTMLElement;
  #passengers: Passenger[];
  constructor(startingFloor: number, numberOfFloors: number, el: HTMLElement) {
    super(numberOfFloors);
    this.#floor = startingFloor;
    this.#domEl = el;
    this.#passengers = [];
  }

  get passengers(): Passenger[] {
    return this.#passengers;
  }

  set passengers(passengers: Passenger[]) {
    this.#passengers = passengers;
  }

  #move(nextFloor: number): void {
    this.#floor = nextFloor;
    const elRef = this.#domEl;
    this.#domEl.remove();
    const floorEl = this.returnLiftFloorEl(nextFloor);
    floorEl.appendChild(elRef);
    this.#domEl = elRef;
  }

  moveUp(): void {
    if (this.#floor < this.floors) {
      this.#move(this.#floor + 1);
    }
  }

  moveDown(): void {
    if (this.#floor > 1) {
      this.#move(this.#floor - 1);
    }
  }

  openDoors(): void {
    const waitingPassengerDomEls = this.returnCustomerElsFromFloorEl(
      this.#floor
    );
    if (waitingPassengerDomEls.length > 0) {
      const waitingPassengers = waitingPassengerDomEls.map((customerDomEl) => {
        const params = this.parseCustomerParamsFromCustomerDomEl(customerDomEl);
        const newCustomer = new Passenger(this.#floor, params.requestedFloor);
        return newCustomer;
      });
      // add customer to the lift
      this.#passengers = [...this.#passengers, ...waitingPassengers];
    }
  }
}

export default Lift;
