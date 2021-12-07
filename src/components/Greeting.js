import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';

const GET_GREETINGS_REQUEST = 'GET_GREETINGS_REQUEST';
const GET_GREETINGS_SUCCESS = 'GET_GREETINGS_SUCCESS';

const getGreetingsSuccess = (json) => ({
  type: GET_GREETINGS_SUCCESS,
  json,
});

const getGreeting = () => (dispath) => {
  dispath({ type: GET_GREETINGS_REQUEST });
  return fetch('http://localhost:3000/v1/greeting.json')
    .then((res) => res.json())
    .then((json) => dispath(getGreetingsSuccess(json)))
    .catch((err) => console.log(err));
};

const Greeting = (props) => {
  let { greeting } = props;
  const { getGreeting } = props;
  const ramdomNumber = Math.floor(Math.random() * 5);
  greeting = greeting[ramdomNumber];
  const { name } = greeting;

  return (
    <>
      Greeting:
      {' '}
      {greeting?.name ? name : 'No greeting'}

      <br />
      <button type="button" onClick={getGreeting}>Get Greeting</button>
    </>
  );
};

const structuredSelector = createStructuredSelector({
  greeting: (state) => state.greetings,
});

Greeting.propTypes = {
  greeting: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  getGreeting: PropTypes.func.isRequired,
};

const mapDispatchToProps = { getGreeting };

export default connect(structuredSelector, mapDispatchToProps)(Greeting);
