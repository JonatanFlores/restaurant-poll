import UsersRepository from '../repositories/UsersRepository';
import PollsRepository from '../repositories/PollsRepository';
import RestaurantsRepository from '../repositories/RestaurantsRepository';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IRestaurant {
  id: string;
  name: string;
}

interface Request {
  user_id: string;
}

interface Response {
  user: IUser;
  poll: {
    voted_today: boolean;
    restaurant?: IRestaurant;
  };
}

class GetLoggedInUserInformationService {
  public async execute({ user_id }: Request): Promise<Response> {
    const date = new Date();
    const usersRepository = new UsersRepository();
    const pollsRepository = new PollsRepository();
    const restaurantsRepository = new RestaurantsRepository();
    const user = await usersRepository.findById(user_id);
    const poll = await pollsRepository.findByUserAndDate(user_id, date);
    delete user.password;
    const response = {
      user,
      poll: {
        voted_today: false,
        restaurant: {} as IRestaurant,
      },
    };

    if (poll) {
      const { restaurant_id } = poll;
      const restaurant = await restaurantsRepository.findById(restaurant_id);
      response.poll.voted_today = true;
      response.poll.restaurant = restaurant;
    }

    return response;
  }
}

export default GetLoggedInUserInformationService;
