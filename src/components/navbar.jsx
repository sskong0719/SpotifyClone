import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from "../pages/home"
import SearchScreen from "../pages/search"
import LibraryScreen from "../pages/library"
import LoginScreen from "../pages/login"
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';



const Tab = createBottomTabNavigator();

function BottomTabs()
{
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                shadowOpacity: 4,
                shadowRadius: 4,
                elevation: 4,
                shadowOffset: {
                    width: 0,
                    height: -4
                },
                borderTopWidth: 0
            }
        }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tarBarLabel: "Home",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Icon name={'home'} size={24} color='white' />
                        ) : (
                            <Icon name={'home-outline'} size={24} color='gray' />
                        )
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tarBarLabel: "Search",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Icon name={'search'} size={24} color='white' />
                        ) : (
                            <Icon name={'search-outline'} size={24} color='gray' />
                        )
                }}
            />
            <Tab.Screen
                name="Library"
                component={LibraryScreen}
                options={{
                    tarBarLabel: "Your Library",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Icon name={'library'} size={24} color='white' />
                        ) : (
                            <Icon name={'library-outline'} size={24} color='gray' />
                        )
                }}
            />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator();
function Navigation()
{
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen
                    name="Main" component={BottomTabs} options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation