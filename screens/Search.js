/*This is an Example of SearchBar in React Native*/
import * as React from 'react';
import {getCities} from '../src/service/meteo'
import Iconf from 'react-native-vector-icons/FontAwesome'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform, Alert, TouchableOpacity
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {meteoTown} from '../src/config/react_config'
import {getMeteo} from '../src/service/meteo'
import Icon from 'react-native-vector-icons/Entypo'

import Iconf5 from 'react-native-vector-icons/FontAwesome5'

var meteoTowns="";
global.town = null;

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: '', dataSource: [] , titre:null, town: meteoTown};
    
    this.arrayholder = [];
    this.getTitle= this.getTitle.bind(this)
  }

  getTitle(state){
    this.setState({town: state})

   Alert.alert(this.state.town)
    getMeteo(this.state.town).then(data => {
      this.setState({
        isLoading: false,
      });
  }, error => {
      Alert.alert("Erreur", "Erreur de réception des données")
  });
}

  static navigationOptions = ({ navigation }) => {
    return{
     
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
  componentDidMount() {
    getCities().then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
            
          },
          function() {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };

  NavigateParam(town)
  {
    global.town = town;
    this.props.navigation.navigate('First');
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Type Here..."
          value={this.state.search}
        />
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          renderItem={({ item }) => (
          <TouchableOpacity 
          onPress={() => this.NavigateParam(item.name)} style={styles.container} >
            <Iconf name="search" size={15} color="#000" style={styles.iconstyle}/>

            <Text style={styles.textStyle}  >{item.name}</Text>
          </TouchableOpacity>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />

      </View>
    );
  }
}
//export {meteoTowns} 


const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: Platform.OS == 'ios' ? 30 : 0,
  },
  textStyle: {
    
    padding: 10,
    fontSize: 18,
    height: 44,
    marginLeft:20
  },
  container: {
    flex: 1,
  flexDirection: "row",
  //justifyContent: "space-between",
  
  //marginRight: 200,
  marginLeft: 10,
  alignContent: "center",
 height:45,
  width:500
  },
  iconstyle:{
    marginTop:15
     
  }
});
