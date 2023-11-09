import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/home'
import Navbar from './src/components/navbar';
import { NavigationContainer } from '@react-navigation/native';

const styles = StyleSheet.create({

})
export default function App()
{
    return (
        <>
            <Navbar />
        </>
    );
}