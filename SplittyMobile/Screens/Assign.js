'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Button
} from 'react-native';

const colors = ["#6CE6C1","#8594E8","#6CC0E6","#E594FF","#F1FF94"]


//creating a class, this class inherits from compnent which is from react lib^^
//export
export default class Assign extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Assign',
      headerRight: (
        <Button
          onPress={() => {
            
          }}
          title="Next"
        />
      ),
    }
  }

  state = {
    items: [],
    currentUser: "",
    people: []
  }

  componentWillMount() {
    var key = 0;
    var newItems = [];
    var newPeople = [];
    this.props.navigation.getParam('receiptData').forEach((item) =>{
      newItems.push({key: key, name: item[1], price: item[2], owner: "", color: ""})
      key += 1;
    });

    this.props.navigation.getParam('people').forEach((person) =>{
      newPeople.push({key: person.key, name: person.name, color: person.color, selected: false, items:{}})
    });

    this.setState({items: newItems, people: newPeople});
  }

  linkItemToUser = async (item) => {

    var idxI = -1;
    var reset = false;
    var newItems = this.state.items.slice();
    for(var i = 0; i < newItems.length; i++) {
      if (newItems[i].key === item.key) {
        idxI = i;
        break;
      }
    }

    if (idxI != -1) {
      // console.warn("Not -1")
      if (newItems[idxI].owner !== "" && newItems[idxI].owner !== this.state.currentUser) return;
      if (newItems[idxI].owner !== "") reset = true;
      // console.warn("New thing")
      newItems[idxI].owner = reset ? "" : this.state.currentUser;
    }

    var idxP = -1;
    for(var i = 0; i < this.state.people.length; i++) {
      if (this.state.people[i].name === this.state.currentUser) {
        idxP = i;
        break;
      }
    }
    if (idxP != -1) {
      if (!item.key in this.state.people[idxP].items) {
        this.state.people[idxP].items[item.key] = 1;
      } else {
        delete this.state.people[idxP].items[item.key];
      }
    }
    var color = this.state.people[idxP].color;
    newItems[idxI].color = reset ? "" : color;

    await this.setState({items: newItems});
  }

  renderItem = (item) => {
    return (
      <TouchableOpacity onPress={() => this.linkItemToUser(item)}>
        <View style={styles.itemContainer}>
          <View style={styles.nameContainer}>
            <View style={[styles.radioView, {backgroundColor: item.color !== "" ? item.color : "transparent"}]}/>
            <Text style={styles.text}>  {item.name} </Text>
          </View>
          <Text style={styles.text}> {'$' + item.price} </Text>

        </View>
      </TouchableOpacity>
    )
  }

  changeUser = async (newName) => {
    if (newName === this.state.currentUser) return;

    var newList = this.state.people.slice();
    var idxS = -1;
    var idxN = -1;
    for(var i = 0; i < newList.length; i++) {
      if (newList[i].name === this.state.currentUser) {
        idxS = i;
      }
      if (newList[i].name === newName) {
        idxN = i;
      }
    }
    if (idxS != -1) {
      newList[idxS].selected = false;
    }
    if (idxN != -1) {
      newList[idxN].selected = true;
    }
    await this.setState({currentUser: newName});
    this.setState({people: newList});
  }

  renderName = (item) => {
    return (
        <TouchableOpacity onPress={() => this.changeUser(item.name)}>
          <View style={[styles.initialsView, {backgroundColor: item.color, borderColor: item.selected ? '#007AFF' : '#9f9f9f', borderWidth: item.selected ? 3 : 1,}]}>
            <Text style={styles.text}> {item.key} </Text>
          </View>
        </TouchableOpacity>
    )
  }

  render() {//spec
    return (
      <View
        style={styles.container}>
        <FlatList
          data={this.state.items}
          style={styles.list}
          renderItem={({item}) => this.renderItem(item)}
        />
        <View style={{height: 100, width: '100%'}}>
          <FlatList
            style={styles.horList}
            horizontal={true}
            data={this.state.people}
            renderItem={({item}) => this.renderName(item)}
          />
        </View>

      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  list: {
    flex: 1,
    width: '100%',
    paddingRight: 16,
    paddingLeft: 16
  },
  horList: {
    width: '100%'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#BDBDBD'
  },
  radioView: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#9f9f9f',
    marginRight: 12
  },
  initialsView: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 15,
    marginTop: 10
  },
  text: {
    fontFamily: "System",
    fontSize: 17,
    fontWeight: "500",
    color: "#4E4E4E"
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

});
