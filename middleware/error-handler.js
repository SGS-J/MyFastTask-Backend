import express from "express";

const app = express();

app.use((req, res, next) => {
   if(req.statusCode >= 500) {
      res.send(`<h4>Server fatal error "${req.statusMessage}"</h4>`)
   }
   next()
})