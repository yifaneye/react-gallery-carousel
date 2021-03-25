export default class ReversedMap {
  constructor(map, isMaximized) {
    this.reversedMap = {};

    Object.keys(map).forEach((key) => {
      if (isMaximized && key.endsWith('AtMax')) return;
      const value = map[key];
      this.reversedMap[value] = key;
    });
  }

  get = (key) => {
    return this.reversedMap[key];
  };
}
