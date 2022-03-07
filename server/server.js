import express from "express";
import webpack from "webpack";
import fs from "fs";
import path from "path";
import renderFront from "./front";
import webpackConfig from "../webpack.config.dev";
const app = express();
const compiler = webpack(webpackConfig);
app.use(
    require("webpack-dev-middleware")(compiler, {
        publicPath: webpackConfig.output.publicPath,
    })
);

app.use(require("webpack-hot-middleware")(compiler));
app.listen(8027, function (err) {
    if (err) {
        return;
    }
    console.log("app started ... 8027");
});
app.use("/", express.static(path.join(__dirname, "../static")));

app.get("/*", function (req, res) {
    var data = fs.readFileSync(`${path.join(__dirname, "../", "static")}/manifest.json`);
    let manifest = JSON.parse(data);
    res.header("Content-Type", "text/html; charset=utf-8");
    res.status(200).end(renderFront(manifest));
});
