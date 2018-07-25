'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  CameraRoll
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImgToBase64 from 'react-native-image-base64';
var base64js = require('base64-js')

//creating a class, this class inherits from compnent which is from react lib^^
//export
export default class Camera extends Component {

  static navigationOptions = ({navigation}) => { //curly brackets gotta match
    return {
      header: null, // we changing the default options bc it looks weird
    }
  }

  //constructor
  //componentWillMount
  //render
  //componentDidMount

  uploadPhoto = async (PicturePath) => {

    const data = new FormData();
    data.append('name', 'testName'); // you can append anyone.
    data.append('photo', {
      uri: PicturePath,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName'
    });
    try {

      var response = await fetch('http://10.106.233.218:8000/api/', {
        method: 'post',
        body: data
      });

      var responseJson = await response.json();
      this.props.navigation.navigate('People', {receiptData: responseJson.text});
    } catch (error) {
      this.props.navigation.navigate('People', {receiptData: responseJson});
    }


  }

  render() {//special function is calle when router wants to know what to render

    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        />
      </View>
    );
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.3, forceUpOrientation:true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
      CameraRoll.saveToCameraRoll(data.uri);
      //send whole image to sever.
      this.uploadPhoto(data.uri);
      //props and static
        }
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  preview: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    backgroundColor: 'transparent',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#A8A8A8',
    borderWidth: 7,
    margin: 40
  }
});
