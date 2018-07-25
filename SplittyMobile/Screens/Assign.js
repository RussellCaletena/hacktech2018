'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';


//creating a class, this class inherits from compnent which is from react lib^^
//export
export default class Assign extends Component {
  state = {
    selectedPerson:"",//who's list?
    totalInfo:[],
    items: [{key: '2M', name: '2% MILK', price: 4.89},
             {key: '2M.1', name: '2% MILK', color: 4.89},
             {key: 'Cl', name: 'CLEMENTINES', price: 6.49},
             {key: 'OGT', name: 'ORG GRD TURKEY', price: 16.87},
             {key: 'YOP', name: 'YOPLAIT STRAWBERRY', price: 3.49},
             {key: 'CN', name: 'CHICKEN NUGGETS', price: 4.89}],
    anything: "Hello"
  }

  constructor(props) {
    super(props);
  }
 // items = {//this will later be dynamic
 //            items: [{key: '2M', name: '2% MILK', price: 4.89},
 //                     {key: '2M.1', name: '2% MILK', color: 4.89},
 //                     {key: 'Cl', name: 'CLEMENTINES', price: 6.49},
 //                     {key: 'OGT', name: 'ORG GRD TURKEY', price: 16.87},
 //                     {key: 'YOP', name: 'YOPLAIT STRAWBERRY', price: 3.49},
 //                     {key: 'CN', name: 'CHICKEN NUGGETS', price: 4.89}],
 //
 //            people: [{key: 'Abd', name: 'Abdallah AbuHashem', color: '#6CE6C1'},
 //                     {key: 'Ros', name: 'Rosanne Hu', color: '#8594E8'}],
 //            }
  checkItem = (item) =>{

  }

  componentDidMount() {
    // this.state.anything = "Different text";
    this.setState({anything: "Different text"});
  }

  renderName = (item) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.nameContainer}>
          <View style={[styles.initialsView, {backgroundColor: item.color}]}>
            <Text style={styles.bubbleText}> {item.key} </Text>
          </View>
          <Text style={styles.bubbleText}>  {item.name} </Text>
        </View>
        <TouchableOpacity onPress={() => this.checkItem(item.key)}>
        </TouchableOpacity>
      </View>
    )

  }


  render() {//spec
    // const { selectedItems } = state;
    return (
      <View>
      {/*}<FlatList
          data={this.state.items}
          style={styles.list}
          renderItem={({item}) => this.renderName(item)}
        />*/}
        <Text> {this.state.anything} </Text>
      
      </View>

    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  list: {
    flex: 1,
    width: '100%',
    paddingRight: 16,
    paddingLeft: 16
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
  initialsView: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 1,
    borderColor: '#9f9f9f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  bubbleText: {
    fontFamily: "System",
    fontSize: 17,
    fontWeight: "500",
    color: "#4E4E4E"
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});;
