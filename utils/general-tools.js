class Tools {
  static formatNumberWithComma(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default Tools;
