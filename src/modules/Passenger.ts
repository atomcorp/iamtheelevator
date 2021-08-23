class Passenger {
  startingFloor: number;
  requestedFloor: number;
  rating: number;
  constructor(startingFloor: number, requestedFloor: number) {
    this.startingFloor = startingFloor;
    this.requestedFloor = requestedFloor;
    this.rating = 5;
  }
}

export default Passenger;
