const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()


// ############################ API

const   moment      =   require('moment'),
        bodyParser  =   require('body-parser'),
        mongo       =   require('mongodb').MongoClient,
        ObjectId    =   require('mongodb').ObjectID,
        creds       =   require('./creds.json'),
        socketPort  =   8200,
        http        =   require('http').createServer(app),
        cors        =   require('cors'),
        multer      =   require('multer'),
        io          =   require('socket.io')(http);


moment.suppressDeprecationWarnings = true;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public')); //stylesheets and js
app.use(express.static('/public/dist'));
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


function dbConnect(dbName, collectionName, callback) {
    mongo.connect(creds.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err, client) => {
      if (err) {
        console.error(err)
        return
      }

      var   db              = client.db(dbName),
            collection      = db.collection(collectionName);
      
        callback(collection, client)
    });
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './static/backgrounds')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
  })

const specialBackgrounds = multer({
    storage: storage,
})

app.get('/api/restaurants', (req, res) => {
dbConnect('F&B', 'Conf', function(collection, client) {
collection.find({}).toArray((err, docs) => {
    if (err) {
        res.status(500).end();
        console.log('WTF')
        console.log(err);
        client.close();
    } else {
        res.json(docs);
        client.close();               
    };

});

});
});

app.get('/api/menu/:id', (req, res) => {
dbConnect('F&B', 'Menu-Items', (collection, client) => {
collection.find({Restaurant: req.params.id}).toArray((err, docs) => {
    if (err) {
        console.log(err);
        client.close();
    } else {
        res.json(docs);
        client.close();
    }
})
});
});

app.get('/api/special/conf/:id', (req, res) => {
    dbConnect('F&B', 'Special-Conf', (collection, client) => {
        collection.find({Restaurant: req.params.id}).toArray((err, docs) => {
            if (err) {
                console.log(err);
                client.close();
            } else {
                res.json(docs);
                client.close();
            }
        })
    })
});

app.get('/api/special/params', (req, res) => { // returns all special items
        dbConnect('F&B', 'Special-Items', (collection, client) => {
            collection.find({}).toArray((err, doc) => {
                if (err) {
                    console.log(err)
                    res.status(500).end();
                    client.close();
                } else {
                    console.log('sent all items');
                    res.json(doc);
                    client.close();
                }
            })
        })
})

app.post('/api/special/params', (req, res) => { // returns one special items
    let id = new ObjectId(req.body._id)
    dbConnect('F&B', 'Special-Items', (collection, client) => {
        collection.find({'_id': id}).toArray((err, doc) => {
            if (err) {
                console.log(err)
                res.status(500).end();
                client.close();
            } else {
                res.json(doc);
                client.close();
            }
        })
    })
})

app.post('/api/special/params/update', (req, res) => {
    let obj = req.body.obj;
    let id = new ObjectId(req.body.obj._id);
    let current = req.body.current; //true or false if refresh needs to be sent to menu

    dbConnect('F&B', 'Special-Items', (collection, client) => {
        collection.updateOne({'_id': id},
        { $set: { 
            Img: obj.Img,
            Name: obj.Name,
            price: obj.price,
            Description: obj.Description,
            Label: obj.Label
        }
        })
        .then(result => {
            if (result) {
                res.status(200).end();
                    if (current === true) {
                        emit('command', 'special', 'refresh')
                    }
                client.close();
            } else {
                res.status(500).end();
                client.close();
            }
        })
    })

})

app.post('/api/changeMenuItem', (req, res) => {
    let obj = {
    _id: req.body._id,
    Name: req.body.Name,
    price: req.body.price
    }
    let id = new ObjectId(obj._id);
dbConnect('F&B', 'Menu-Items', (collection, client) => {
    collection.updateOne({_id: id}, 
        { $set: {
        price: obj.price,
        Name: obj.Name
        }
    })
        .then(result => {
            if (result) {
                res.status(200).end();
                emit('command', 'menu', 'refresh')
                client.close();
            } else {
                res.status(500).end();
                client.close();
            }
        })
        .catch(err => res.status(500).end());
})
});

app.post('/api/changeSpecialItem', (req, res) => {
    let idBoard = new ObjectId(req.body.idBoard);
    let idItem = req.body.idItem;
    console.log(idBoard)
    console.log(idItem)
     dbConnect('F&B', 'Special-Conf', (collection, client) => {
        collection.updateOne({_id: idBoard},
            { $set: {
            Link: idItem
            }
        })
        .then(emit('command', 'special', 'refresh'))
        .then(res.status(200).end())
     })
});

app.post('/api/newitem', (req, res) => {
let obj = {
Name: req.body.Name,
Restaurant: req.body.Restaurant,
price: req.body.price
}
dbConnect('F&B', 'Menu-Items', (collection, client) => {
    collection.insertOne(obj)
        .then(result => {
            if (result) {
                res.status(200).end()
                client.close()
            } else {
                res.status(500).end()
            }
        })
        .catch(err => res.status(500).end())
})
});

app.use((err, req, res, next) => {
    if (err.code === 'INCORRECT_FILETYPE') {
        res.status(422).json({ error: 'Only images are allowed'});
        return;
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error('Incorrect file');
            error.code = 'INCORRECT_FILETYPE';
            return cb(error, false)
        }
    cb(null, true);
}

app.post('/upload', specialBackgrounds.single('file'), (req, res) => {
    let newItem = {
        Restaurant: req.body.Restaurant,
        Label: req.body.Label,
        Name: req.body.Name,
        Description: req.body.Description,
        price: req.body.price,
        Img: '/backgrounds/' + req.file.filename
    }

        newSpecialItem(newItem, (worked) => {
            if (worked = true) {
                res.status(200).end();
            } else {
                res.status(500).end();
            }
        });
})

app.post('/upload/no-image', (req, res) => {
    let newItem = {
        Restaurant: req.body.Restaurant,
        Label: req.body.Label,
        Name: req.body.Name,
        Description: req.body.Description,
        price: req.body.price,
        Img: '/backgrounds/default.jpg'
    }

    newSpecialItem(newItem, (worked) => {
        if (worked = true) {
            res.status(200).end();
        } else {
            res.status(500).end();
        }
    });
})

 function newSpecialItem(newItem, callback) {
        dbConnect('F&B', 'Special-Items', (collection, client) => {
            collection.insertOne(newItem)
                .then(result => {
                    if (result) {
                        callback(true);
                        client.close();
                    }
                })
                .catch(err => {
                    callback(false);
                    console.log(err);
                    client.close()
                })
        })    
}

//websocket stuff
//io.of('/ws')
io.on('connection', function(socket){
console.log('a user connected');
});





//websocket stuff





app.get('/refresh', (req, res) => {
emit('command', 'menu', 'refresh')
emit('command', 'special', 'refresh')
res.send('refresh')
})

function emit(type, target, action) {
    io.emit('action_events', { type: type, target: target, action: action});
    console.log('refresh sent')
}



http.listen(socketPort, function(){
console.log('listening on *:8200');
});




// ############################# END API



// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)


  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
