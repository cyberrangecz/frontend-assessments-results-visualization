/**
 * Class representing one choice in EMI answer
 */
export class EMIChoice {
  /**
   * x coordinate (row)
   */
  x: number;
  /**
   * y coordinate (column)
   */
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * True if coordinates of this emi choice match coordinates of provided emi choice
   * @param choice emi choice to compare
   */
  equals(choice: EMIChoice): boolean {
    return this.x === choice.x && this.y === choice.y;
  }
}
