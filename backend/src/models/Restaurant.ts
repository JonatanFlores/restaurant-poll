class Restaurant {
  id: string;

  name: string;

  constructor({ id, name }: Restaurant) {
    this.id = id;
    this.name = name;
  }
}

export default Restaurant;
