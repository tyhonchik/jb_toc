import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { DataProvider } from "./containers/DataContext";
import MainPage from "./pages/MainPage";

const App = () => (
  <Router>
    <DataProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:pageId" element={<MainPage />} />
      </Routes>
    </DataProvider>
  </Router>
);

export default App;
