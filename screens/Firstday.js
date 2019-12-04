import React from 'react'
import {getMeteo} from '../src/service/meteo'
import {
    View, Image, Alert,
    ScrollView, Text,
    TouchableOpacity, StyleSheet,
    ActivityIndicator, ImageBackground
    } from 'react-native'
import {MonoText} from '../components/StyledText'

import Icon from 'react-native-vector-icons/Entypo'
import Iconf from 'react-native-vector-icons/FontAwesome'
import Iconf5 from 'react-native-vector-icons/FontAwesome5'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

export default class FirstDay extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
      day0: null,
    }
  }

  /*componentDidMount()
  {
    return fetch('https://www.prevision-meteo.ch/services/json/limoges')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                  isLoading: false,
                  city_info: responseJson.city_info,
                  dataSource: responseJson.current_condition,
                  fcst_day_0: responseJson.fcst_day_0,
                  fcst_day_1: responseJson.fcst_day_1,
                  fcst_day_2: responseJson.fcst_day_2,
                  fcst_day_3: responseJson.fcst_day_3,
                  fcst_day_4: responseJson.fcst_day_4,
                })
            })
            .catch( (error) => {
                console.log(error)
            });
  }*/

  componentDidMount()
  {
    getMeteo().then(data => {
      this.setState({
        isLoading: false,
        data: data.current_condition,
        day0: data.fcst_day_0
      });
    }, error => {
        Alert.alert("Erreur","Erreur de réception des données")
    });
  }

  render()
  {
    if(this.state.isLoading)
    {
      return (
          <View style={styles.ActivityIndicatorStyle}>
              <ActivityIndicator size="large"/>
          </View>
      )
    }
    else
    {
      return (
        <ImageBackground source={{uri: 'https://i.ytimg.com/vi/o6wMCkY7kjA/maxresdefault.jpg'}} style={{width: '100%', height: '100%'}} resizeMode="cover">
            <ScrollView>
                <View style={styles.codeHighlightContainer, styles.viewAlignVertically}>
                    <Text style={styles.codeHighlightText, styles.textHeader}>
                      <MonoText>Max</MonoText> : {this.state.day0.tmax} °C <Iconf name="long-arrow-up" size={16} color="#000"/>
                    </Text>
                    <Text style={styles.codeHighlightText, styles.textHeader}>
                      <MonoText>Min</MonoText> : {this.state.day0.tmin} °C <Iconf name="long-arrow-down" size={14} color="#000"/>
                    </Text>
                </View>

                <View>
                  <View style={styles.viewAlignVertically2}>
                    <View style={styles.viewAlignVertically}>
                      <Iconf style={styles.textPrincipal} 
                      name="thermometer" size={26} color="#000"/>
                      <Text style={styles.textPrincipal}>{this.state.data.tmp} °C</Text>
                    </View>
                      <Image
                        style={{width: 100, height: 100, alignContent: 'center'}}
                        source={{uri: this.state.data.icon}}
                      />
                  </View>

                  <View style={styles.viewAlignVertically2}>
                    <View style={styles.viewAlignVertically}>
                      <Iconf name="dashboard" size={16} color="#000"/>
                      <Text style={{marginLeft: 5}}>Pression : {this.state.data.pressure}</Text>
                    </View>
                    <Text>{this.state.data.condition}</Text>
                  </View>
                </View>

                <View>
                    <View style={styles.viewAlign}>
                      <Iconf5 name="cloud-rain" size={16} color="#000"/>
                      <Text style={{marginLeft: 5}}>Humidité : {this.state.data.humidity}</Text>
                    </View>
                    <View style={styles.viewAlign}>
                      <Iconf5 name="wind" size={16} color="#000"/>
                      <Text style={{marginLeft: 5}}>Vents : {this.state.data.wnd_spd}</Text>
                    </View>
                </View>

                <View style={styles.viewAlignVertically2, {marginTop: 10}}>
                    <View style={styles.viewAlign}>
                      <Iconf5 name="calendar" size={16} color="#000"/>
                      <Text style={{marginLeft: 5}}>
                        {this.state.day0.day_long} {'\t\t'}
                        {this.state.day0.date}
                      </Text>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
      );
    }
  }

}

FirstDay.navigationOptions = {
    title: "Limoges",
    headerStyle: {
        backgroundColor: 'white'
    },
    headerLeft: (
        <TouchableOpacity onPress={() => alert('HomeScreen')}>
        <Text
          style={{
            color: 'gray',
          }}>
          <Icon name="chevron-thin-left" size={20} color="#000"/>
        </Text>
      </TouchableOpacity>
    ),
    headerRight : (
        <TouchableOpacity onPress={() => alert('SettingsScreen')}>
        <Text
          style={{
            color: 'gray',
          }}>
           <Icon name="dots-three-vertical" size={20} color="#000"/>
        </Text>
      </TouchableOpacity>
    )
  };

function handleBackPress()
{
    
}

const styles = StyleSheet.create(
    {
        ActivityIndicatorStyle: {
          alignContent: "center",
          flex: 1,
          backgroundColor: '#fff'
        },
        viewAlignVertically: {
            flex: 1,
            flexDirection: "row",
        },
        viewAlign: {
          flex: 1,
          flexDirection: "row",
          marginLeft: 20,
          marginTop : 10
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
            fontSize: 15,
            marginBottom: 10,
            marginLeft: 20,
            marginTop: 5
        },

        textStandard: {
          marginLeft: 20,
          
        },

        textPrincipal: {
          fontSize: 35,
          marginBottom: 10,
          marginLeft: 5,
          marginTop: 15,
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
    }
)
