import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import GoogleIcon from '../images/google_icon.svg';
import FacebookIcon from '../images/facebook_icon.svg';
import AppleIcon from '../images/apple_icon.svg';
import * as AppAuth from 'expo-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () =>
{
    const navigation = useNavigation();

    //Whenever app is open.
    useEffect(() =>
    {
        const checkTokenValidity = async () =>
        {
            //check if token and expirate date exist in local storage
            const accessToken = await AsyncStorage.getItem("token");
            const expirationDate = await AsyncStorage.getItem("expirationDate");
            console.log("access token", accessToken);
            console.log("expirate date", expirationDate);
            
            // if yes, check if they are valid, if valid then go to Main
            // otherwise go sign in
            if (accessToken && expirationDate)
            {
                const currentTime = Date.now();
                if (currentTime < parseInt(expirationDate))
                {
                    // token valid
                    navigation.replace("Main");
                } else
                {
                    // token expired
                    // remove form async storage
                    AsyncStorage.removeItem("token");
                    AsyncStorage.removeItem("expirationDate");
                }
            }
        }
        checkTokenValidity();
    }, [])

    //When user click Log in. 
    async function authenticate() 
    {
        //configure config
        const config = {
            issuer: "https://accounts.spotify.com",
            clientId: "ef40cccd956e47e0b3cd924b70d24761",
            scopes: [
                "user-read-email",
                "user-library-read",
                "user-read-recently-played",
                "user-top-read",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public"
            ],
            redirectUrl: "exp://localhost:8082/--/spotify"
        }
        //result holds authethication result
        const result = await AppAuth.authAsync(config);
        console.log(result);
        //get accessToken from result
        if (result.accessToken)
        {
            //set exprationDate to the expiration date from result
            const expirationDate = new Date(result.accessTokenExpirationDate).getTime()

            //store token and expiration date in Local Storage (AsyncStorage)
            AsyncStorage.setItem("token", result.accessToken);
            AsyncStorage.setItem("expirationDate", expirationDate.toString());

            //Nav to Main
            navigation.navigate("Main")
        }
    }

    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <SafeAreaView>
                <View style={{ height: 200 }} />
                <Entypo style={{ textAlign: "center" }} name="spotify" size={70} color="white" />
                <Text style={{ color: "white", fontSize: 40, fontWeight: "bold", textAlign: "center", marginTop: 30 }}>
                    Millions of Songs. {"\n"} Free on Spotify.
                </Text>

                <View style={{ height: 50 }} />
                <Pressable style={{
                    backgroundColor: "#1DB954", padding: 10, marginLeft: "auto", marginRight: "auto",
                    width: 300,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text style={{ fontWeight: 700 }}>Sign up free</Text>
                </Pressable>
                <View style={{ height: 10 }} />
                <Pressable style={{
                    backgroundColor: "transparent",
                    padding: 10,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: 300,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    position: 'relative', // Add this line
                }}>
                    <GoogleIcon width="25" height="25" style={{ position: 'absolute', left: 7 }} />
                    <Text style={{
                        color: "white",
                        fontWeight: "700",
                        textAlign: 'center',
                    }}>
                        Continue with Google
                    </Text>
                </Pressable>



                <View style={{ height: 10 }} />
                <Pressable style={{
                    backgroundColor: "transparent",
                    padding: 10,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: 300,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    position: 'relative', // Add this line
                }}>
                    <FacebookIcon width="25" height="25" style={{ position: 'absolute', left: 7 }} />
                    <Text style={{
                        color: "white",
                        fontWeight: "700",
                        textAlign: 'center',
                    }}>Continue with Facebook</Text>
                </Pressable>
                <View style={{ height: 10 }} />
                <Pressable style={{
                    backgroundColor: "transparent",
                    padding: 10,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: 300,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    position: 'relative', // Add this line
                }}>
                    <AppleIcon width="18" height="18" style={{ position: 'absolute', left: 11 }} />
                    <Text style={{
                        color: "white",
                        fontWeight: "700",
                        textAlign: 'center',
                    }}>Continue with Apple</Text>
                </Pressable>
                <View style={{ height: 20 }} />
                <Pressable onPress={authenticate} style={{
                    backgroundColor: "transparent", padding: 10, marginLeft: "auto", marginRight: "auto",
                    width: 300,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text style={{ color: "white", fontWeight: 700 }}>Log in</Text>
                </Pressable>
            </SafeAreaView >
        </LinearGradient >

    )
}

export default LoginScreen;

const styles = StyleSheet.create({});