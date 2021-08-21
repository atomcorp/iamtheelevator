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
}

export default Building;
