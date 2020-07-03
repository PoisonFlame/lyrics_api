const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');
const songRoutes = require('./api/routes/song');
const userRoutes = require('./api/routes/user');
const blacklistRoutes = require('./api/routes/blacklist');
const swaggerJSON = require('./api/docs/swagger.json');
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
            host: "192.168.2.34:3000",
            tags: {
                name: 'Songs',
                description : "Everything about songs"
            },
            servers: ["http://192.168.2.34:3000"]
        }
    },
    apis: ["./api/routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON));

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
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({})
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/songs', songRoutes);
app.use('/user', userRoutes);
app.use('/blacklist', blacklistRoutes);

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