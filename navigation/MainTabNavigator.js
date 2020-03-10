import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Search from '../screens/Search'
import Firstday from '../screens/Firstday';
import Secondday from '../screens/Secondday';
import Thirdday from '../screens/Thirdday';
import SettingsScreen from '../screens/SettingsScreen';
import Iconf5 from 'react-native-vector-icons/FontAwesome5'


const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

const FirstStack = createStackNavigator({
        First: Firstday,
    },
    config
);

FirstStack.navigationOptions = {
    tabBarLabel: "Aujourd'hui",
    tabBarIcon: ({ focused }) => ( <
        Iconf5 name = "dice-one"
        size = { 18 }
        color = "#00A2E8" / >
    ),
};

FirstStack.path = '';

const SecondStack = createStackNavigator({
        Second: Secondday,
    },
    config
);

SecondStack.navigationOptions = {
    tabBarLabel: 'Demain',
    tabBarIcon: ({ focused }) => ( <
        Iconf5 name = "dice-two"
        size = { 18 }
        color = "#00A2E8" / >
    ),
};

SecondStack.path = '';

const SettingsStack = createStackNavigator({
        Settings: SettingsScreen,
    },
    config
);

SettingsStack.path = '';

const SearchStack = createStackNavigator({
    Search: Search,
},
config
);

SearchStack.path = '';

const ThirdStack = createStackNavigator({
        Third: Thirdday,
    },
    config
);

ThirdStack.navigationOptions = {
    tabBarLabel: 'Apres Demain',
    tabBarIcon: ({ focused }) => ( <
        Iconf5 name = "dice-three"
        size = { 18 }
        color = "#00A2E8" / >
    ),
};

ThirdStack.path = '';

const tabNavigator = createBottomTabNavigator({
    FirstStack,
    SecondStack,
    ThirdStack
});

tabNavigator.path = '';

export { SettingsStack, SearchStack };
export default tabNavigator;