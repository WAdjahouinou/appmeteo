import React from 'react'
import { getMeteo } from '../src/service/meteo'
import {
    View,
    Image,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ImageBackground,
} from 'react-native';
import { MonoText } from '../components/StyledText';
import { useKeepAwake } from 'expo-keep-awake';
import Icon from 'react-native-vector-icons/Entypo'
import Iconf from 'react-native-vector-icons/FontAwesome'
import Iconf5 from 'react-native-vector-icons/FontAwesome5'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import {meteoTown} from '../src/config/react_config'

var link = "";
var town = null;

export default class ThirdDay extends React.Component {
    useKeepAwake;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            day0: null,
            temp1: null,
            temp2: null,
            temp3: null,
            temp4: null,
            vent: null,
            hour: null
        }
    }

    updateTemp() 
    {
        const result = Object.values(this.state.day0.hourly_data);

        if (global.Temp == "F")
            {
                this.setState({temp1: ((this.state.day0.tmax * 9/5) + 32) + "°F"});
                this.setState({temp2: ((this.state.day0.tmin * 9/5) + 32) + "°F"});
                this.setState({temp3: ((result[0].TMP2m * 9/5) + 32) + "°F"});
            }
            else{
                this.setState({temp1: this.state.day0.tmax + "°C"});
                this.setState({temp2: this.state.day0.tmin + "°C"});
                this.setState({temp3: result[0].TMP2m + "°C"});
            } 
    }

    updateVent()
    {
        const result = Object.values(this.state.day0.hourly_data);

        if (global.Vent == "m/s")
            {
                this.setState({vent: (result[0].WNDSPD10m  / 3.6) + " m/s"});
            }
            else{
                this.setState({vent: result[0].WNDSPD10m  + " km/h"});
            }
    }

    updateHour()
    {
        if (global.Time == "12")
            {
                this.setState({hour: true});
            }
            else{
                this.setState({hour: false});
            }
    }

    updateColor()
    {
        this.props.navigation.setParams(
            {
              headerStyle: {
                backgroundColor: global.Color
              }
            }
          )
    }
    updateMeteo()
    {
        town = global.town != null ? global.town : meteoTown;
        getMeteo(town).then(data => {
            this.setState({
                isLoading: false,
                data: data.current_condition,
                day0: data.fcst_day_0,
            });
        }, error => {
            Alert.alert("Erreur", "Erreur de réception des données")
        });
    }

    updateAll()
    {
        this.updateVent();
        this.updateTemp();
        this.updateHour();
        this.updateColor();
        this.updateMeteo();
    }

    componentDidMount() {
        getMeteo(meteoTown).then(data => {
            this.setState({
                isLoading: false,
                day0: data.fcst_day_2,
            });
        }, error => {
            Alert.alert("Erreur", "Erreur de réception des données")
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title:  global.town != null ?
            town : meteoTown,
            headerStyle: {
                backgroundColor: global.Color
            },
            headerRight: (
                <View style={styles.container}>
             
                <TouchableOpacity onPress={() => navigation.navigate('Search')} >
                <Text
                  style={{
                    color: 'gray',
                  }}>
                   <Iconf name="search" size={20} color="#000"/>
                </Text>
              </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 13}} onPress = {
                        () => navigation.navigate("Settings") } >
                    <Text style = {
                        {
                            color: 'gray',
                        }
                    } >
                    <Icon name = "dots-three-vertical"
                    size = { 20 }
                    color = "#000"/>
                    </Text> 
                    </TouchableOpacity>
                    </View>
            ),
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
    };

    hoursDisplay = () => {
        const result = Object.values(this.state.day0.hourly_data);
        let table = [];

        for (let i = 0; i < 24; i++) {
            
            let children = []
            
            for (let j = 0; j < 1; j++) {

                if (this.state.hour)
                {
                    var h = i % 12 || 12;
                    var ampm = (i < 12 || i === 23) ? " AM" : " PM";
                }else
                {
                    var h = i;
                    var ampm = " H";
                }

                children.push(<Text style={styles.textHeader}>{`${h + ampm}`}</Text>);
                children.push(<Image source={{ uri: result[i].ICON}} style = {{ width: 30, height: 30 }}></Image>);

                if (global.Temp == "F")
                {
                    temp4 = (result[i].TMP2m * 9/5) + 32;
                    children.push(<Text style={styles.textHeader}>{`${temp4} °F`}</Text>);
                }
                else{
                    temp4 = result[i].TMP2m;
                    children.push(<Text style={styles.textHeader}>{`${temp4} °C`}</Text>);
                }
            }

            table.push(children);
            
        }

        return table;
    }

    render() {
        if (this.state.isLoading) {
            return ( 
            <View style = { styles.ActivityIndicatorStyle } >
                <ActivityIndicator size = "large" />
                </View>
            )
        } else {
            const result = Object.values(this.state.day0.hourly_data);

            if (result[0].CONDITION.includes("Ensoleillé")) {
                link = "https://static.actu.fr/uploads/2018/02/AdobeStock-soleil-et-nuage-854x612.jpg";
            } else if (result[0].CONDITION.includes("Pluie")) {
                link = "https://cdn.pixabay.com/photo/2014/04/05/11/39/rain-316579_960_720.jpg";
            } else if (result[0].CONDITION.includes("Neige")) {
                link = "http://4everstatic.com/images/nature/paysages/paysage-enneige,-foret-149465.jpg";
            } else if (result[0].CONDITION.includes("Nuit")) {
                link = "http://www.treillieres.fr/fileadmin/images/Treillieres/0-Photos_accueil/ACTUALITES/INFOS_PRATIQUES/2019_01/storm-clouds-426271_960_720.jpg";
            } else {
                link = "http://www.acseipica.fr/wp-content/uploads/2015/01/background-e1421612524371.jpg";
            }

            
            return ( 
            <ImageBackground onLoad={this.updateAll.bind(this)} source =  {{ uri: link }} style = {{ width: '100%', height: '100%' }}
                resizeMode = "cover" >
                <ScrollView >
                    <View style = { styles.codeHighlightContainer, styles.viewAlignVertically } >
                        <Text style = { styles.codeHighlightText, styles.textHeader} >
                            <MonoText > Max </MonoText> : {this.state.temp1}<Iconf style={styles.iconStyle} name="long-arrow-up" size={16} color="#000"/>
                        </Text> 
                        <Text style = { styles.codeHighlightText, styles.textHeader }>
                            <MonoText > Min </MonoText> : {this.state.temp2}<Iconf style={styles.iconStyle} name="long-arrow-down" size={14} color="#000"/>
                        </Text> 
                    </View>
                <View>
                    <View style = { styles.viewAlignVertically2 } >
                        <View style = { styles.viewAlignVertically } >
                            <Iconf style = { styles.textPrincipal } name = "thermometer" size = { 26 } color = "#000"/>
                            <Text  style = { styles.textPrincipal } > { this.state.temp3 }</Text> 
                        </View> 
                        <Image style = {{ width: 100, height: 100, alignContent: 'center' }} 
                        source = {{ uri: result[0].ICON } }/> 
                    </View>

                    <View style = { styles.viewAlignVertically2 } >
                        <View style = { styles.viewAlignVertically } >
                            <Iconf style = { styles.iconStyle } name = "dashboard" size = { 18 } color = "#000" />
                            <Text style = { styles.desctext } > Pression: { result[0].PRMSL } </Text> 
                        </View> 
                        <Text style = { styles.meteodescText } > 
                            { result[0].CONDITION } 
                        </Text> 
                    </View>
                </View>

                <View>
                    <View style = { styles.viewAlign } >
                        <Iconf5 style = { styles.iconStyle } name = "cloud-rain" size = { 18 } color = "#000" />
                        <Text style = { styles.desctext } > Humidité: { result[0].RH2m } % </Text> 
                    </View> 
                    <View style = { styles.viewAlign } >
                        <Iconf5 style = { styles.iconStyle } name = "wind" size = { 18 } color = "#000" />
                        <Text style = { styles.desctext } > Vents: { this.state.vent } </Text> 
                    </View> 
                </View>

                <View style = { styles.viewAlignVertically2, {marginTop: 10} } >
                    <View style = { styles.viewAlign } >
                        <Iconf5 style = { styles.iconStyle } name = "calendar" size = { 19 } color = "#000" />
                        <Text style = { styles.textStandard } >
                            Aujourd'hui {'\t\t'} { this.state.day0.day_long } 
                            { '\t\t' } { this.state.day0.date } 
                        </Text> 
                    </View> 
                </View>

                <View style = { styles.lineStyle }/>

                <View>
                    <ScrollView>
                        <Table>
                            { 
                                this.hoursDisplay().map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        style={styles.hoursTable}
                                    />
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View> 
                </ScrollView> 
            </ImageBackground>
            );
        }
    }

}

const styles = StyleSheet.create({
    ActivityIndicatorStyle: {
        alignContent: "center",
        flex: 1,
        backgroundColor: '#fff'
    },
    viewAlignVertically: {
        flex: 1,
        flexDirection: "row",
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'white',
        margin: 10,
    },
    viewAlign: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 10
    },
    hoursTable: {
        marginLeft: 20,
        marginTop: 5
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
        marginTop: 5,
        color: "white"
    },

    meteodescText: {
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 22,
        color: "white",
        width: 130
    },

    textStandard: {
        marginLeft: 15,
        color: "white",
        fontSize: 18
    },

    desctext: {
        marginLeft: 5,
        color: "white",
        fontSize: 18
    },

    iconStyle: {
        color: "white"
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
    container: {
        flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      
      //marginRight: 200,
      
      alignContent: "center",
      width:50
      },
})