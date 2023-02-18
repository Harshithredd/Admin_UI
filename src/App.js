import { Routes , Route} from "react-router-dom";
import Landing from "./components/Landing";
export const config = {
  endpoint: `https://geektrust.s3-ap-southeast-1.amazonaws.com/`,
};
function App() {
  return (
    <>
        <Routes>
            <Route exact path="/" element={<Landing/>}/>
        </Routes>
    </>
  );
}

export default App;
