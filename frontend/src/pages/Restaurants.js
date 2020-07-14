import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card, Button, CardTitle, Row, Col, Badge } from 'reactstrap';
import { toast } from 'react-toastify';
import { FiThumbsUp, FiList } from 'react-icons/fi';

import socket from '../services/socket';
import Layout from '../components/Layout/Master';
import Spinner from '../components/Layout/Spinner';
import { loadRestaurants, voteForRestaurant } from '../actions/restaurant';
import { LOAD_RESTAURANTS } from '../actions/types';

export default function Restaurants() {
  const dispatch = useDispatch();
  const { restaurantsList, loading, error } = useSelector(state => state.restaurant);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [ isAllowedToVote, setIsAllowedToVote ] = useState(false);
  const [ hasVotedToday, setHasVotedToday ] = useState(false);
  const [ restaurant, setRestaurant ] = useState({});
  const [ restaurants, setRestaurants ] = useState([]);

  useEffect(() => {
    socket.on('new-vote-computed', () => {
      socket.emit('new-vote-computed');
      socket.on('update-restaurants-list', restaurants => {
        dispatch({
          type: LOAD_RESTAURANTS,
          payload: restaurants
        });
      });
    });

    dispatch(loadRestaurants());
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    setRestaurants(restaurantsList);

    return () => {};
  }, [restaurantsList]);

  useEffect(() => {
    if (user) {
      const { poll } = user;
      const { restaurant } = poll;

      setRestaurant(restaurant);
      setHasVotedToday(poll.voted_today);
      setIsAllowedToVote(isAuthenticated && !hasVotedToday);
    }

    return () => {};
  }, [hasVotedToday, isAuthenticated, setIsAllowedToVote, user])

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }

    return () => {};
  }, [error])

  function vote(restaurant) {
    if (isAuthenticated) {
      dispatch(voteForRestaurant(restaurant.id));
    } else {
      toast.info('Você precisa estar logado para poder votar', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  }

  return (
    <Layout>
      {restaurant.id && (
        <div className="alert alert-info mt-4 mb-0" role="alert">
          <p className="my-0 text-center">Você escolheu almoçar no restaurante <b>{restaurant.name}</b>, hoje!</p>
        </div>
      )}

      <h3 className="py-4 d-flex align-items-center justify-content-center">
        <FiList /> <span className="ml-2">Lista de Restaurantes</span>
      </h3>
      
      <Row>
        {restaurants.map(restaurant => (
          <Col key={restaurant.id} lg="6" className="mb-4">
            <Card body>
              <CardTitle className="lead d-flex align-items-center">
                <span className="text-info">{restaurant.name}</span>
                {restaurant.votes > 0 && (
                  <div className="ml-auto">
                    <small>Votos de Hoje: </small>
                    <Badge color="success" pill>{restaurant.votes}</Badge>
                  </div>
                )}
              </CardTitle>
              {isAuthenticated ? (
                <Button
                  disabled={isAllowedToVote ? false : true}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={() => vote(restaurant)}
                >
                  {hasVotedToday ? (
                    <span>Você já votou Hoje</span>
                  ) : (
                    <>
                      <FiThumbsUp style={{ marginTop: '-4px', marginRight: '5px' }} />
                      <span>Eu Quero Comer Aqui</span>
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={() => vote(restaurant)}
                >
                  <FiThumbsUp style={{ marginTop: '-4px', marginRight: '5px' }} />
                  <span>Eu Quero Comer Aqui</span>
                </Button>
              )}
            </Card>
          </Col>
        ))}
      </Row>
      <Spinner loading={loading} />
    </Layout>
  );
}