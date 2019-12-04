import React, {Component} from 'react'
import {getMeteo} from '../src/service/meteo'
import {
    View, Image, Alert,
    ScrollView, Text,
    TouchableOpacity, StyleSheet,
    ActivityIndicator, ImageBackground
    } from 'react-native'

import Icon from 'react-native-vector-icons/Entypo'
import Iconf from 'react-native-vector-icons/FontAwesome'
import Iconf5 from 'react-native-vector-icons/FontAwesome5'

class CurrentDay extends Component 
{
    constructor(props)
    {
        super(props);
        this.data = props.data;
    }
}