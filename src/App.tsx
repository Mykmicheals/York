import { Provider } from "react-redux";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <HomeScreen />
    </Provider>
  );
}

export default App;
