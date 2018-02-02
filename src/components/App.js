import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {RoomPage, RoomsPage} from './routes';
import {Grid, Cell} from 'react-md';

class App extends Component {
  render() {
    return (
      <Grid className='app-container' noSpacing>
        <Cell
          size={6}
          offset={3}
          position='center'
          phoneSize={12}
          phoneOffset={0}
          className='rooms-cell'
        >
          <Route exact path='/' component={RoomsPage} />
          <Route path='/room/:id' component={RoomPage} />
        </Cell>
      </Grid>
    );
  }
}

export default App;
