import { DataProvider } from "./containers/DataContext";
import { MainPage } from "./pages/MainPage";

const App = () => (
  <DataProvider>
    <MainPage />
  </DataProvider>
);

export default App;
