import React from "react"
import { connect } from "react-redux"

import { createStructuredSelector } from "reselect"

const GET_GREETINGS_REQUEST = "GET_GREETINGS_REQUEST"
const GET_GREETINGS_SUCCESS = "GET_GREETINGS_SUCCESS"

const getGreeting = () => {
  return dispath => {
    dispath({ type: GET_GREETINGS_REQUEST })
    return fetch("http://localhost:3000/v1/greeting.json")
      .then(res => res.json())
      .then(json => dispath(getGreetingsSuccess(json)))
      .catch(err => console.log(err))
  }
}

const getGreetingsSuccess = json => {
  return {
    type: GET_GREETINGS_SUCCESS,
    json
  }
}

class Greeting extends React.Component {
  render () {

    let { greeting } = this.props
    console.log(greeting, this.props)
    const ramdomNumber = Math.floor(Math.random() * 5)
    greeting = greeting[ramdomNumber]


    return (
      <React.Fragment>
        Greeting: {greeting?.name ? greeting.name: "No greeting"} 

        <br />
        <button onClick={this.props.getGreeting}>Get Greeting</button>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  greeting: state => state.greetings
})

const mapDispatchToProps = {  getGreeting }

export default connect(structuredSelector, mapDispatchToProps)(Greeting)
