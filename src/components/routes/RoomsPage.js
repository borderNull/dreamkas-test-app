import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchAll, roomsMenuSelector} from '../../ducks/rooms';
import {push} from 'react-router-redux';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Paper,
  SelectField,
  Grid,
  Cell
} from 'react-md';


const propTypes = {
  fetchAll: PropTypes.func,
  push: PropTypes.func,
  roomsList: PropTypes.array
};

class RoomsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewType: 0
    };
  }
  componentDidMount() {
    this.props.fetchAll();
  }

  handleRoomView = id => () => {
    this.props.push(`/room/${id}`);
  }

  handleRoomsType = viewType  => {
    this.setState({
      viewType
    });
  }

  getRoomsHeader = () => {
    const {viewType} = this.state;
    const selectList = [{value: 0, label: 'Все'}, {value: 1, label: 'Забронированные'}, {value: 2, label: 'Свободные'}];

    return (
      <Grid  noSpacing className='rooms-header'>
        <Cell size={6} phoneSize={12}>
          <h1>Бронирование комнат</h1>
        </Cell>
        <Cell size={6} phoneSize={12} className='rooms-select' >
          <SelectField
            id='select'
            menuItems={selectList}
            onChange={this.handleRoomsType}
            defaultValue={viewType}
            value={viewType}
          />
        </Cell>
      </Grid>
    );
  }

  getRoomsTable = () => {
    const {roomsList} = this.props;
    const {viewType} = this.state;
    let roomTypes;

    switch (viewType) {
      case 0: {
        roomTypes = roomsList;
        break;
      }
      case 1: {
        roomTypes = roomsList.filter(room => room.name);
        break;
      }
      case 2: {
        roomTypes = roomsList.filter(room => !room.name);
        break;
      }
      default: {
        roomTypes = null;
        break;
      }
    }

    return (
      <DataTable plain className='rooms-table'>
        <TableHeader className='table-header'>
          <TableRow>
            <TableColumn>Номер комнаты</TableColumn>
            <TableColumn>Имя</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!roomTypes && roomTypes.map(room => (
            <TableRow key={room.id} onClick={this.handleRoomView(room.id)} className='rooms-table-row'>
              <TableColumn className='rooms-table-column'>
                <div className='rooms-table-column-div'>
                  {room.number}
                </div>
                <div className='rooms-table-column-div-second'>
                  {room.name ? room.name : '-'}
                </div></TableColumn>
              <TableColumn className='rooms-table-column rooms-table-second-column'>{room.name ? room.name : '-'}</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    );
  }

  render() {
    return (
      <div className='rooms-wrapper'>
        <Paper zDepth={0} className='paper-container'>
          {this.getRoomsHeader()}
          {this.getRoomsTable()}
        </Paper>
      </div>
    );
  }
}

RoomsPage.propTypes = propTypes;

export default connect(
  state => ({
    roomsList: roomsMenuSelector(state)
  }), {fetchAll, push})(RoomsPage);
