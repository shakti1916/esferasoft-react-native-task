import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  FlatList,
  Modal,
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteTask, editTask, toggleTaskComplete } from "../redux/to-do-slice";

const DashboardScreen = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState<{
    id: string;
    title: string;
    description?: string;
  } | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completedTasks, setCompletedTasks] = useState<{
    [key: string]: boolean;
  }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<TextInput>(null);

  const dispatch = useDispatch();
  const handleToggleCompletion = (taskId: string) => {
    if (!completedTasks[taskId]) {
      dispatch(toggleTaskComplete(taskId));
      Alert.alert("Task completed");
      setCompletedTasks((prevCompletedTasks) => ({
        ...prevCompletedTasks,
        [taskId]: true,
      }));
    }
  };
  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setCurrentTask(task);
      setTitle(task.title);
      setDescription(task.description || "");
      setModalVisible(true);
    }
  };
  const handleSaveChanges = () => {
    if (currentTask) {
      dispatch(editTask({ id: currentTask.id, title, description }));
      setModalVisible(false);
    }
  };
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTaskItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleToggleCompletion(item.id)}
      style={styles.taskItem}
    >
      <View style={styles.taskSection1}>
        <Text style={[styles.taskTitle]}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleEditTask(item.id)}>
          <MaterialCommunityIcons name="pencil" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <Text style={styles.taskDescription}>{item.description}</Text>

      <View style={styles.deleteTaskCompletedSection}>
        {item.completed && (
          <Text style={styles.completedTaskText}>Task Completed</Text>
        )}
        <TouchableOpacity
          style={{
            justifyContent: "flex-end",
            display: "flex",
            flexDirection: "row",
          }}
          onPress={() => handleDeleteTask(item.id)}
        >
          <MaterialCommunityIcons name="delete" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.profileContainer}>
            <View>
            <Text style={styles.nameSignatureAndTitle}>
              Good Morning,
            </Text>
            <Text style={styles.nameSignatureAndTitle}>
            Esfreasoft Team

            </Text>
            </View>
            <View style={styles.profileImage}>
              <MaterialCommunityIcons name="account" size={30} color="gray" />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
            activeOpacity={0.8}
            style={styles.searchInputFieldContainer}
          >
            <AntDesign
              name="search1"
              size={24}
              color="gray"
              style={{ marginLeft: 10 }}
            />

            <TextInput
              ref={inputRef}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search"
            />
          </TouchableOpacity>

          <View style={styles.dashBoardSubTitleSection}>
            <Text
              style={[
                styles.dashboardSubTitleText,
                styles.dashboardSubTitleTextActive,
              ]}
            >
              All Notes
            </Text>
            <Text style={styles.dashboardSubTitleText}>Work</Text>
            <Text style={styles.dashboardSubTitleText}>Home</Text>
          </View>
          <View style={styles.flatListViewCont}>
            <FlatList
              data={filteredTasks}
              renderItem={renderTaskItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
            />
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Task</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Title"
              />
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
                multiline
              />
              <View style={styles.modalButtons}>
                <Button title="Save" onPress={handleSaveChanges} />
                <Button
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                  color="red"
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    paddingTop: Platform.OS === "android" ? 40 : 0,
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
  searchInputFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 10,
    borderRadius: 3,
    marginHorizontal: 7,
    padding: 5,
    marginTop: 20,
  },
  dashBoardSubTitleSection: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    paddingTop: 20,
  },

  dashboardSubTitleTextActive: {
    borderBottomColor: "yellow",
    borderBottomWidth: 2,
  },

  dashboardSubTitleText: {
    color: "#fff",
    fontSize: 16,
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    flex: 1,
    maxWidth: "48%", // Ensures two items per row
  },
  flatListViewCont: {
    marginVertical: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  taskTitle: {
    fontSize: 16,
    color: "#000",
  },
  taskDescription: {
    color: "#666",
  },
  completedTaskText: {
    color: "green",
    marginVertical: 10,
  },

  taskSection1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteTaskCompletedSection: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  deleteText: {
    color: "red",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DashboardScreen;
