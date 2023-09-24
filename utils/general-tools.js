class Tools {
  static formatNumberWithComma(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  static getRandomItemFromArray(array) {
    if (!array.length) throw new Error("Array is empty!");
    return array[Math.floor(Math.random() * array.length)];
  }

  static getTimeFromDate(dateString) {
    return dateString.split(" ")[0];
  }

  static getRandomInt(max) {
    return Math.floor(Math.random * max);
  }
}

export default Tools;
