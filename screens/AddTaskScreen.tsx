import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
    Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/to-do-slice";

const AddTaskScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()


    const [title,setTitle] = useState<string>('')
    const [titleDescription,setTitleDescription] = useState<string>('')

    const onPressAddButton = () => {

        if(title.trim() === ''){
            Alert.alert("Title cannot be empty");
            return;
        }

        dispatch(addTask({title,description:titleDescription}))
        navigation.navigate("Dashboard" as never)

    }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View >
          <View style={styles.profileContainer}>
            <Text style={styles.nameSignatureAndTitle}>
              Good Morining,{"\n"} Esfreasoft Team
            </Text>
            <View style={styles.profileImage}>
              <MaterialCommunityIcons name="account" size={30} color="gray" />
            </View>
          </View>

          <Text style={styles.addTaskTitle}>
            Add task
          </Text>
          
          <View style={styles.inputField}>
          <TextInput value={title} onChangeText={setTitle}placeholder="Enter Title" />
          </View>

          <View style={styles.inputField}>
          <TextInput value={titleDescription} onChangeText={setTitleDescription}multiline={true}  numberOfLines={50}placeholder="Enter description"  style={styles.multilineInput} />
          </View>

          <TouchableOpacity onPress={onPressAddButton} style={styles.AddBtn}>
           <Text style={styles.addBtnTitle}>Add</Text> 
          </TouchableOpacity>

          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddTaskScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
      padding: 20,
      paddingTop:Platform.OS === "android"? 50:0
    },
    profileContainer: {
      // flex:1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    nameSignatureAndTitle: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "500",
    },
    profileImage: {
      display: "flex",
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: "#000",
      alignItems: "center",
      justifyContent: "center",
    },
    addTaskTitle: {
        textAlign:"center",
        color:"#fff",
        fontSize:18,
        paddingTop:20

   
    },
    multilineInput: {
      height: 200, 
      textAlignVertical: 'top',  
      padding: 10, 
      backgroundColor: '#fff', 
      borderRadius: 5, 
    },
    inputField:{
        backgroundColor: "#fff",
        borderRadius: 3,
        marginHorizontal: 7,
        padding: 5,
        marginTop: 20,

    },
    AddBtn:{
        backgroundColor:"orange",
        // padding:5,
        marginVertical:30,
        borderRadius:5
    },
    addBtnTitle:{
        marginVertical:10,
        color:"#fff",
        textAlign:"center",
        fontSize:18,
        fontWeight:"500"
    }
  });