import React, {Component} from 'react';
import {Button, TextField} from 'react-md';
import {connect} from 'react-redux';
import {roomsMenuSelector, updateRoomName} from '../../ducks/rooms';
import {push} from 'react-router-redux';
import PropTypes from 'prop-types';

const propTypes = {
  roomsList: PropTypes.array,
  match: PropTypes.object,
  updateRoomName: PropTypes.func,
  push: PropTypes.func
};


class RoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {
        id: null,
        number: null,
        name: null
      }
    };
  }

  componentDidMount() {
    this.handleUpdateRoom();
  }


  handleGoBack = () => {
    window.history.back();
  };

  handleUpdateRoom = () => {
    const {roomsList, match} = this.props;
    const selectedRoom = roomsList.find(room => room.id === +match.params.id);

    this.setState({
      room: selectedRoom
    });
  }

  handleUpdateName = name => {
    this.setState({
      room: {...this.state.room, name}
    });
  }

  handleSubmitRoom = () => {
    const {room} = this.state;

    this.props.updateRoomName(room);
    this.props.push('/');
  }


  render() {
    const {roomsList, match} = this.props;
    const selectedRoom = roomsList.find(room => room.id === +match.params.id);


    return (
      <div className='room-wrapper'>
        <div className='room-header'>
          <Button icon onClick={this.handleGoBack} className='arrow-back-btn'>arrow_back</Button>
          <h1>{selectedRoom.number}</h1>
        </div>
        <div className='room-footer'>
          <TextField
            id='placeholder-only-title'
            placeholder='Имя'
            onChange={this.handleUpdateName}
            className='room__text-field md-cell'
            defaultValue={selectedRoom.name}
          />
          <Button raised primary onClick={this.handleSubmitRoom}>Сохранить</Button>
        </div>
      </div>
    );
  }
}

RoomPage.propTypes = propTypes;

export default connect(
  state => ({
    roomsList: roomsMenuSelector(state)
  }), {updateRoomName, push})(RoomPage);
