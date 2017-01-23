GLOBAL = require('../src/Globals');

import React, {Component} from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Dimensions,
  Navigator,
  Button,
  TextInput,
  Menu
} from 'react-native';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import Room from './Room';
import KeyboardSpacer from 'react-native-keyboard-spacer';
const Gear = require('./icons/gear.png');
const Search = require('./icons/search.png');
import app from './app';

export default class Home extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      roomSearch: '',
      dataSource: ds.cloneWithRows([])
    };
    this.loadData();
  }

  loadData(room) {
    if (room) {
      return fetch('https://api.dubtrack.fm/room/term/' + room)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(json.data)
          });
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      return fetch('https://api.dubtrack.fm/room')
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(json.data)
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  //use command+shift+k to enable keyboard hardware on ios emulator to test search bar
  render() {
    return (
      <View style={styles.container}>

        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
        <TextInput
          style={styles.searchBar}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Search for a room"
          returnKeyType='search'
          returnKeyLabel='search'
          onChangeText={(roomSearch) => this.setState({roomSearch})}
          onSubmitEditing={() => {
            this.loadData(this.state.roomSearch)
          }}/>
        <KeyboardSpacer/>
      </View>
    );
  }

  renderRow(rowData) {
    var {height, width} = Dimensions.get('window');
    var uri;

    if (rowData.background) {
      uri = rowData.background.secure_url;
    } else {
      uri = 'https://res.cloudinary.com/hhberclba/image/upload/c_fill,fl_lossy,f_auto,w_320,h_180/default.png';
    }
    return (
      <Card>
        <CardImage>
          <TouchableHighlight onPress={ () => this.pressRow(rowData)}>
            <Image
              style={{width: width, height: 150}}
              source={{uri: uri}}
            />
          </TouchableHighlight>
        </CardImage>
        <CardTitle>
          <Text style={styles.rowTitle}> {rowData.name} </Text>
        </CardTitle>
      </Card>
    );
  }

  pressRow(rowData) {
    this.props.navigator.push({
      title: 'Room',
      passProps: {
        roomId: rowData._id
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
  },
  nav: {
    position: 'absolute',
    top: 30,
    flex: 1,
    alignSelf: 'stretch',
    right: 0,
    left: 0,
  },
  settingsButton: {
    zIndex: 1,
    position: 'absolute',
    right: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  roomList: {
    marginTop: 30,
  },
  searchBar: {
    height: 30,
    borderColor: 'black',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    margin: 10,
  },
  rowContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    paddingLeft: 10,
    paddingRight: 10,
  },
  rowTitle: {
    color: '#333333',
    fontSize: 18,
  },
});
