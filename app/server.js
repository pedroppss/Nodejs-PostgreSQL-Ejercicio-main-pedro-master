const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8080;
const db = require("./models");
const expressSwagger = require("express-swagger-generator")(app);
const URL_BASE = "/Pedrops/v1/"
const departmentRoute = require("./routers/departmentRouter.js");
const userRoute = require("./routers/userRouter.js");
const uploadroute = require("./routers/uploadFile.js");
const memorystorage = require("./routers/uploadFileMemoryStorage.js");
//const multer = require("multer");
//const upload = multer({dest: "uploads/"});

var corsOptions =
{
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la aplicación Pedro Pérez Sánchez." });
});



//require("./router/departmentRouter")//(app);
//app.use("/api/users",userRoutes);

let options =
{
  swaggerDefinition: {
    info: {
      description: 'This application has been developed by Pedro Pedro Pérez',
      title: 'SwaggerApiPedro',
      version: '1.0.0',
    },
    host: `localhost:${PORT}`,
    basePath: `${URL_BASE}`,
    produces: [
      "application/json"
      //"application/xml"
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "",
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ["./routers/*.js", "./models/*.js"] //Path to the API handle folder
};
expressSwagger(options);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(URL_BASE, departmentRoute);
app.use(URL_BASE, userRoute);
app.use(URL_BASE, uploadroute);
app.use(URL_BASE, memorystorage);


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}.`); });



