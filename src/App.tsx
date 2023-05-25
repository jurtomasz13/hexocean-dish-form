import "./App.css";
import { DishForm } from "./components";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DishForm />
    </LocalizationProvider>
  );
}

export default App;

