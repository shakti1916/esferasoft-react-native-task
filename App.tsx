import { Provider } from "react-redux";
import StackNaviagtior from "./navigation/StackNaviagtor";
import store, { persistor } from "./redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";




export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>


    <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
      
    <StackNaviagtior/>
    </PersistGate>

    </Provider>
    
    </GestureHandlerRootView>
  
    
  );
}


