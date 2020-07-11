import Restaurant from '../models/Restaurant';
import db from '../storage/database';

class RestaurantsRepository {
  public async find(): Promise<Array<Restaurant>> {
    const { restaurants } = db;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(restaurants);
      }, 1000);
    });
  }
}

export default RestaurantsRepository;
