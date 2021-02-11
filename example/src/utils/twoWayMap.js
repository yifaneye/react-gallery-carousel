export default class TwoWayMap {
  constructor(map) {
    this.map = map;
    this.reverseMap = {};

    Object.keys(map).forEach((key) => {
      const value = map[key];
      this.reverseMap[value] = key;
    });
  }

  get = (key) => {
    return this.map[key];
  };

  getReversed = (key) => {
    return this.reverseMap[key];
  };
}
