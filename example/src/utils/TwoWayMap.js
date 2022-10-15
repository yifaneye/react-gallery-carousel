export default class TwoWayMap {
  constructor(map) {
    this.map = map;
    this.reversedMap = {};

    Object.keys(map).forEach((key) => {
      const value = map[key];
      this.reversedMap[value] = key;
    });
  }

  get = (key) => {
    return this.map[key];
  };

  getReversed = (key) => {
    return this.reversedMap[key];
  };
}
