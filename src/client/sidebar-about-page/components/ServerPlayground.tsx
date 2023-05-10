class Cell {
  row: number;
  col: number;

  constructor(cell: string);
  constructor(row: number, col: number);
  constructor(arg1: string | number, arg2?: number) {
    if (typeof arg1 === 'string') {
      const [letters, numbers] = arg1.match(/^([a-zA-Z]+)(\d+)$/).slice(1);
      this.col = this.getColumnNumber(letters);
      this.row = parseInt(numbers);
    } else {
      this.row = arg1;
      this.col = arg2!;
    }
  }

  getColumnNumber(column) {
    let result = 0;
    for (let i = 0; i < column.length; i++) {
      const charCode = column.charCodeAt(i) - 64; // A is 65 in ASCII, so subtract 64 to get 1 for A, 2 for B, etc.
      result = result * 26 + charCode;
    }
    return result;
  }

  getColumnLetters() {
    let letters = '';
    while (this.col > 0) {
      const modulo = (this.col - 1) % 26;
      letters = String.fromCharCode(65 + modulo) + letters;
      this.col = Math.floor((this.col - 1) / 26);
    }
    return letters;
  }

  rowOffSet(by: number) {
    return this.row + by;
  }

  toString() {
    return this.getColumnLetters() + this.row.toString();
  }
}

export function setSalesHire(table) {
  const SalesQuotaCell = new Cell('A17');
  const SalesHireCell = new Cell('E18');
  table.forEach((tuple, i) => {
    console.log(SalesQuotaCell.rowOffSet(i), SalesQuotaCell.col);
    console.log(
      new Cell(SalesQuotaCell.rowOffSet(i), SalesQuotaCell.col).toString(),
      new Cell(SalesHireCell.rowOffSet(i), SalesHireCell.col).toString()
    );
  });
}
