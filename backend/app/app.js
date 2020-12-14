const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');
const songRoutes = require('./api/routes/song');
const userRoutes = require('./api/routes/user');
const blacklistRoutes = require('./api/routes/blacklist');
const swaggerJSON = require('./api/docs/swagger.json');
const { appendFileSync } = require('fs');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Lyrics API",
            version: '1.0.0',
            description: "This is an api used to fetch lyrics for songs. This can be done through many method such as by name, by artist, by album etc.",
            contact: {
                name: "Rudra Sharma",
                email: "api@rpsh.me"
            },
            host: "https://lyrics.rpsh.me/api/",
            tags: {
                name: 'Songs',
                description : "Everything about songs"
            },
            servers: ["https://lyrics.rpsh.me/api/"]
        }
    },
    apis: ["./api/routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/lyrics/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON));

mongoose.connect('mongodb+srv://robby:' + process.env.MONGO_ATLAS_PW + '@lyrics-api-xb8oz.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.Promise = global.Promise;
//test comment
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET,OPTIONS');
        return res.status(200).json({})
    }
    next();
});

//app.use(cors())

// const corsOptions = {
//     origin: ['*'],
//     allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
//     credentials: true,
//     enablePreflight: true
// }

// app.use(cors());
// // app.options('*', cors(corsOptions))
app.use('/lyrics/v1/products', productRoutes);
app.use('/lyrics/v1/orders', orderRoutes);
app.use('/lyrics/v1/songs', songRoutes);
app.use('/lyrics/v1/user', userRoutes);
app.use('/lyrics/v1/blacklist', blacklistRoutes);

app.use((req,res,next)=> {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use ((error, req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    })
});

module.exports = app;
