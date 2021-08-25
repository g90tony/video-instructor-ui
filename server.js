function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get("x-forwarded-proto") !== "https") {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}
const express = require("express");
const app = express();
app.use(requireHTTPS);

app.use(express.static("./dist/video-instructor-ui"));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/video-instructor-ui/" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
