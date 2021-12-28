import ReactDOM from "react-dom"
import {
    HashRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./Pages/Home"
import Sample from "./Pages/Sample";

ReactDOM.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sample" element={<Sample />} />
        </Routes>
    </HashRouter>,
    document.getElementById('app')
);
