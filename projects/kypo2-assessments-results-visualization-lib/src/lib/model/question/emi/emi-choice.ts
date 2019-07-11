export class EMIChoice {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(choice: EMIChoice): boolean {
    return this.x === choice.x && this.y === choice.y;
  }
}
