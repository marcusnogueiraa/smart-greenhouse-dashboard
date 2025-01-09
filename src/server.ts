import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views")); 
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    res.render("pages/monitoring", { title: "Dashboard" });
});

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`)
});