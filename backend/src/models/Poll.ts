class Poll {
  user_id: string;

  restaurant_id: string;

  date: Date;

  constructor({ user_id, restaurant_id, date }: Poll) {
    this.user_id = user_id;
    this.restaurant_id = restaurant_id;
    this.date = date;
  }
}

export default Poll;
