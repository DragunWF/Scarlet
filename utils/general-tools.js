class Tools {
  static formatNumberWithComma(number) {
    return number
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default Tools;
