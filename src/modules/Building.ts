class Building {
  floors: number;
  constructor(floors: number) {
    this.floors = floors;
  }
  get numberOfFloors(): number {
    return this.floors;
  }
  returnLiftFloorEl(floor: number): HTMLElement {
    return document.querySelector(`[data-lift-floor="${floor}"]`);
  }
  returnCustomerFloorEl(floor: number): HTMLElement {
    return document.querySelector(`[data-customer-floor="${floor}"]`);
  }
  returnCustomerElsFromFloorEl(floor: number): HTMLElement[] {
    const floorEl = document.querySelector(`[data-customer-floor="${floor}"]`);
    return Array.from(floorEl.querySelectorAll<HTMLElement>("[data-customer]"));
  }
  parseCustomerParamsFromCustomerDomEl(customerDomEl: HTMLElement): {
    requestedFloor: number;
  } {
    const requestedFloor = parseInt(customerDomEl.dataset.requestedFloor, 10);
    return {
      requestedFloor,
    };
  }
  removePassengerFromFloor(floor: number, passengerDomEl: HTMLElement): void {
    const floorEl = document.querySelector(`[data-customer-floor="${floor}"]`);
    floorEl.removeChild(passengerDomEl);
  }
  renderWaitingPassenger(floor: number, requestedFloor: number): void {
    const floorEl = this.returnCustomerFloorEl(floor);
    const rootDomEl = document.createElement("span");
    rootDomEl.dataset.customer = "true";
    rootDomEl.dataset.requestedFloor = requestedFloor.toString();
    rootDomEl.dataset.direction = requestedFloor > floor ? "up" : "down";
    rootDomEl.innerText = `(🙋‍♂️: ${requestedFloor}) `;
    floorEl.appendChild(rootDomEl);
  }
}

export default Building;
