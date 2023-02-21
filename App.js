import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Quote" component={QuoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation, route }) => {

  let theText = null
  if(route) {
    if(route.params) {
      if(route.params.inputVariable) {
        theText = route.params.inputVariable
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainBody}>
        <View style={styles.content}>
          <View style ={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile', {name: 'Jane'})}>
              <Text style={styles.text}>Go to Jane's Profile </Text>
            </TouchableOpacity>
          </View>
          <View style ={styles.space}></View>
          <View style ={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Quote')}>
              <Text style={styles.text}>Go to Quote Screen </Text>
            </TouchableOpacity>
          </View>
          <View style ={styles.space}></View>
          <View style={styles.textBox}>
            <Text style={styles.textAuthor}> Text Input: {theText} </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ProfileScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainBody}>
        <View style={styles.content}>
          <Text style={styles.textAuthor}> This is {route.params.name}'s profile </Text>
          <View style ={styles.space}></View>
          <View style ={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Info')}>
              <Text style={styles.text}>Go to Info Screen </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const InfoScreen = ({ navigation, route }) => {
  const[input, setInput] = React.useState("");

  return (
    <View>
      <SafeAreaView>
        <TextInput>
          style={{ height:40 }}
          onChangeText={setInput}
          value={input}
          placeholder="Enter Input"
          placeholderTextColor="grey"
          keyboardType="default"
        </TextInput>
      </SafeAreaView>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home', {inputVariable: input})}>
      </Button>
      <Text> This is:  {input} </Text>
    </View>
  );
};

const QuoteScreen = ({ navigation, route }) => {
  const[input1, setInput1] = React.useState('');
  const[input2, setInput2] = React.useState('');

  const callAPI = async () => {
    try {
        const res = await fetch(
            `https://famous-quotes4.p.rapidapi.com/random?category=all&count=2`,
            {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '92256381cdmsh0b1243086e8d054p1282bcjsnae87a6b3544f',
                    'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
                },
            }
        );
        const data = await res.json();
        setInput1(data);
        setInput2(data[0]);
        console.log(data);
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainBody}>
        <View style={styles.content}>
          <View style ={styles.button}>
            <TouchableOpacity
              onPress={(callAPI)}>
              <Text style={styles.text}>Make API Call</Text>
            </TouchableOpacity>
          </View>
          <View style ={styles.space}></View>
          <View style={styles.textBox}>
            <Text style={styles.textAuthor}> {input2?.author}</Text>
            <View style ={styles.space}></View>
            <Text style={styles.textText}> {input2?.text}</Text>
        </View>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  mainBody: {
    flex:4,
    flexDirection: "column",
    backgroundColor: "white",
    //height: "75%",
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "midnightblue",
  },
  content: {
    borderWidth: 5,
    borderColor: "teal",
    backgroundColor: "powderblue",
    height: "80%",
    width: '80%',
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textBox: {
    borderWidth: 5,
    borderColor: "teal",
    backgroundColor: "white",
    height: "60%",
    width: '95%',
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  space: {
    height: "10%",
    width: '100%',
    // borderWidth: 5,
    // borderColor: "red",
    padding: 15,
  },
  button: {
    backgroundColor: "teal",
    borderWidth: 5,
    borderColor: "darkslategrey",
    height: "15%",
    width: '70%',
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "midnightblue",
    shadowOpacity: 0.5,
    shadowRadius: 15 ,
    shadowOffset : { width: 7, height: 7},
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    //borderWidth: 5,
    //borderColor: "yellow",
  },
  textAuthor: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "midnightblue",
    //borderWidth: 5,
    //borderColor: "yellow",
  },
  textText: {
    textAlign: "center",
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: "italic",
    color: "midnightblue",
    //borderWidth: 5,
    //borderColor: "yellow",
  },
});