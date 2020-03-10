import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  View, Image, 
  ScrollView, Text,
  TouchableOpacity, StyleSheet,
  ActivityIndicator, ImageBackground,
  Picker, Alert, Switch
  } from 'react-native'

import {ButtonGroup, Button, Card} from 'react-native-elements'
import ModalDropdown from 'react-native-modal-dropdown';
import { MonoText } from '../components/StyledText';
import Icon from 'react-native-vector-icons/Entypo'
import Iconf from 'react-native-vector-icons/FontAwesome'
import Iconf5 from 'react-native-vector-icons/FontAwesome5'

global.Temp = "C";
global.Vent = "km/h";
global.Time = "24";
global.Color = "White";
export default class SettingsScreen extends React.Component {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  constructor()
  {
    super()
    this.state = {
      TempSelectIndex: 1,
      VentSelectIndex: 0,
      TimeSelectIndex: 0,
      Color: "white",
    }
    this.updateTempIndex = this.updateTempIndex.bind(this);
    this.updateVentIndex = this.updateVentIndex.bind(this);
    this.updateTimeIndex = this.updateTimeIndex.bind(this);
    this.updateColor = this.updateColor.bind(this);
  }

  updateTempIndex (TempSelectIndex) {
    this.setState({TempSelectIndex})
    if(TempSelectIndex == 0){
      global.Temp = "F";
    }else{
      global.Temp = "C";
    }
  }
  updateVentIndex (VentSelectIndex) {
    this.setState({VentSelectIndex})
    if(VentSelectIndex == 0){
      global.Vent = "km/h";
    }else{
      global.Vent = "m/s";
    }
  }
  updateTimeIndex (TimeSelectIndex) {
    this.setState({TimeSelectIndex})
    if(TimeSelectIndex == 0){
      global.Time = "24";
    }else{
      global.Time = "12";
    }
  }

  updateColor(color)
  {
    this.setState({Color: color});
    global.Color = color;
    this.props.navigation.setParams(
      {
        headerStyle: {
          backgroundColor: global.Color
        }
      }
    )
  }

  static navigationOptions = ({ navigation }) => {
    return{
      title: 'Paramètres',
      headerStyle: {
        backgroundColor: global.Color
      },
      headerLeft: ( <TouchableOpacity onPress = {
        () => navigation.navigate("Main") } >
          <Text style = {
              {
                  color: 'gray',
              }
          } >
          <Icon name = "chevron-thin-left"
          size = { 20 }
          color = "#000"/>
          </Text> 
          </TouchableOpacity>
      ),
    }
  }

   render() {
    const TempButtons = ["F", "C"];
    const VentButtons = ["km/h", "m/s"];
    const TimeButtons = ["24", "12"];
    const ColorOptions = ['grey', 'white', 'lightblue', 'olive'];

    const { TempSelectIndex,
      VentSelectIndex,
      TimeSelectIndex } = this.state

    return (
        <ScrollView>
          <View style={styles.viewAlignVertically}>
            <View>
              <Image
                style={styles.imageCSS}
                source={require('../assets/images/icon.png')}
              />
            </View>
            <View style={styles.viewAlignHorizontally, styles.textHeader}>
              <Text style={styles.desctext}><MonoText>METEO</MonoText></Text>
              <Text><MonoText>By Nawiko-TECH</MonoText></Text>
            </View>
          </View>

          <View style = { styles.lineStyle }/>
          <Text style={styles.titleStyle}>
            Unités de mesures
          </Text>
          <View style = { styles.lineStyle }/>

          <View>
            <View style = { styles.viewAlignVertically } >
              <Iconf style={styles.iconStyle} name = "thermometer" size = { 18 } color = "#000" />
              <View style={styles.viewAlignVertically2}>
                <Text style = { styles.desctext2 } > Température </Text>
                <ButtonGroup
                  onPress={this.updateTempIndex}
                  selectedIndex={TempSelectIndex}
                  buttons={TempButtons}
                  containerStyle={{height: 30, width: 90, marginTop: -2}}
                />
              </View>
            </View>
           
            <View style = { styles.viewAlignVertically } >
              <Iconf5 style={styles.iconStyle} name = "wind" size = { 18 } color = "#000" />
              <View style={styles.viewAlignVertically2}>
                <Text style = { styles.desctext2 } > Vent </Text>
                <ButtonGroup
                  onPress={this.updateVentIndex}
                  selectedIndex={VentSelectIndex}
                  buttons={VentButtons}
                  containerStyle={{height: 30, width: 90, marginTop: -2}}
                />
              </View>
            </View>
          </View>

          <View style = { styles.lineStyle }/>
          <Text style={styles.titleStyle}>
            Format de Temps
          </Text>
          <View style = { styles.lineStyle }/>
          
          <View>
            <View style = { styles.viewAlignVertically } >
              <Iconf style={styles.iconStyle} name = "clock-o" size = { 18 } color = "#000" />
              <View style={styles.viewAlignVertically2}>
                <Text style = { styles.desctext2 } > Format de Temps </Text>
                <ButtonGroup
                  onPress={this.updateTimeIndex}
                  selectedIndex={TimeSelectIndex}
                  buttons={TimeButtons}
                  containerStyle={{height: 30, width: 90, marginTop: -2}}
                />
              </View>
            </View>
          </View>

          <View style = { styles.lineStyle }/>
          <Text style={styles.titleStyle}>
            Thèmes d'application
          </Text>
          <View style = { styles.lineStyle }/>
          
          <View style={{marginBottom:20}}>
            <View style = { styles.viewAlignVertically2} >
              <Text style = { styles.desctext2 } > Couleur d'arrière plan </Text>
              <ModalDropdown 
                textStyle={{fontSize: 18}} 
                dropdownTextStyle={{fontSize: 20}} 
                defaultValue="white"
                onSelect={(value) => this.updateColor((String(ColorOptions[value])))} 
                options={ColorOptions}/>
            </View>
          </View>


        </ScrollView>
    );
   }
  
}

const styles = StyleSheet.create
  ({
    ActivityIndicatorStyle: {
      alignContent: "center",
      flex: 1,
      backgroundColor: '#fff'
  },
  desctext2: {
    color: "black",
    fontSize: 18
},
iconStyle: {
  marginTop: 4,
  marginLeft: 12
},
  viewAlignVertically: {
      flex: 1,
      flexDirection: "row",
      margin: 10
  },
  lineStyle: {
      borderWidth: 0.5,
      borderColor: 'black',
      margin: 10,
  },
  viewAlign: {
      flex: 1,
      flexDirection: "row",
      textAlign:  "center",
      marginLeft: 20,
      marginTop: 10
  },
  imageCSS:{
      alignContent: "center",
      height: 100,
      width: 100
  },
  viewAlignVertically2: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginRight: 20,
      marginLeft: 20,
      alignContent: "center"
  },
  viewAlignHorizontally: {
      flex: 1,
      flexDirection: "column",
  },
  textHeader: {
      fontSize: 18,
      marginBottom: 10,
      marginLeft: 20,
      marginTop: 20,
      color: "black"
  },

  titleStyle: {
      fontStyle: "normal",
      fontWeight: "bold",
      marginLeft: 10,
      fontSize: 18,
      color: "black"
  },

  textStandard: {
      marginLeft: 15,
      color: "white",
      fontSize: 18
  },

  desctext: {
    fontWeight: "bold",
      color: "black",
      fontSize: 18,
      marginBottom: 10
  },

  textPrincipal: {
      fontSize: 35,
      marginBottom: 10,
      marginLeft: 5,
      marginTop: 15,
      color: "white"
  },
  homeScreenFilename: {
      marginVertical: 7,
  },
  codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
  },
})
