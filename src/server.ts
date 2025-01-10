import express from "express";
import path from "path";
import { getSensorData } from "./controllers/dataController";


const app = express();
const PORT = 3001;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views")); 
app.use(express.static(path.join(__dirname, "../public")));


app.get('/sensor-data', getSensorData);

app.get("/", (req, res) => {
    res.render("", { title: "Dashboard" });
});

app.get("/monitoring", (req, res) => {
    res.render("pages/monitoring", { title: "Dashboard - Monitoring" });
});

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`)
});

export {app};