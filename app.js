require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Quote = require("./models/quote")
const postID = require("./models/id");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

//Setup
const app = express();
app.use(express.static("build"));

const dbURI = process.env.DB_URI;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));})
    .catch((error) => {console.log(error)});

app.set("view engine","ejs");
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

//API CODE

app.post("/get-next-quote",(req,res) => {
    console.log(req.body)
    if(req.body.type === "Random" || req.body.type === "specialSearch" || req.body.type === "idSearch" ){
        Quote.findOne({_id: {$gt: req.body.ID}}).sort({_id:1}).exec((err,result) => {
            if (result != null){
                res.json(result);
            }
            else{
                res.status(400).send();
            }
        })
    }

    if(req.body.type === "authorSearch"){
        Quote.findOne().where("_id").gt(req.body.ID).where("author").equals(req.body.author).exec((err,result) => {
            if (result != null){
                res.json(result);
            }
            else{
                res.status(400).send();
            }
        })
    }
})

app.post("/get-previous-quote",(req,res) => {
    if(req.body.type === "Random" || req.body.type === "specialSearch" || req.body.type === "idSearch"){
        Quote.findOne({_id: {$lt: req.body.ID}}).sort({_id:-1}).exec((err,result) => {
            if (result != null){
                res.json(result);
            }
            else{
                res.status(400).send();
            }
        })
    }

    if(req.body.type === "authorSearch"){
        Quote.findOne().where("_id").lt(req.body.ID).where("author").equals(req.body.author).sort({_id:-1}).exec((err,result) => {
            if (result != null){
                res.json(result);
            }
            else{
                res.status(400).send();
            }
        })
    }
})

app.post("/create-quote", authUser, (req,res) => {
    const content = req.body.content;
    const quote = new Quote({
        content: content,
        author: req.user.username,
        like: [],
        dislike: []
    });

    quote.save()
    .then((quote) => {
        res.json(quote._id);
        res.status(200);
    })
    .catch((err) => {
        console.log("err");
        res.status(310).send();
    });

});

function authUser(req,res,next){
    const token = req.body.token;
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if (err){
            res.status(401).send();
            return;
        }
        else{
        req.user = user;
        next();
    }
    });
}

app.post("/signup-user", async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        });
        user.save()
        .then(()=>{
            res.status(200).send();
        })
        .catch((err)=>{
            res.status(406).send();
        })

    }
    catch{
    
        res.status(400).send();
    }
});

app.post("/auth-user", (req,res) => {
    jwt.verify(req.body.token,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if (err){
            res.json("NOUSER");
        }
        else{
        res.json(user);
    }
    });    
});


app.post("/login-user", async (req,res) => {
    console.log(req.body);
    User.findOne({username: req.body.username}, async (err,user) =>{
        if(user != null){
            try{
                if(await bcrypt.compare(req.body.password,user.password)){
                    const accessToken = jwt.sign({username: user.username, id: user._id}, process.env.ACCESS_TOKEN_SECRET);
                    res.json(accessToken);
                }
                else{
                    console.log("NOT AUTH");
                    res.status(403).send();
                }

            }
            catch{
                console.log(err)
            }
        }
        else{
            console.log("User not found!");
            res.status(403).send();
        }
    });
});

app.get("/random-quote", (req,res) =>{
    
    Quote.count()
    .then((count) => {

        const random = Math.floor(Math.random() * count);

        Quote.findOne().skip(random)
        .then((result) => {
            res.json(result);
        });
    });


});

app.post("/dislike-quote", authUser, (req,res)=> {
    
    let likeflag = false;
    let dislikeflag = false;

    Quote.findOne({_id: req.body.ID})
    .then((result) => {
        result.like.forEach((el) =>{
            if (el == req.user.id){
                likeflag = true;
            }
        });
        
        result.dislike.forEach((el) => {
            if (el == req.user.id){
                dislikeflag = true;
            }
        });


        if (dislikeflag === true){
            //already disliked
            res.status(400).send();

        }
        else{
            //if liked?
            if(likeflag === true){
                //remove like
                Quote.findOne({_id: req.body.ID})
                .then((result) => {
                    let likers = result.like
                    likers.splice(likers.indexOf(req.body.ID),1);
                    Quote.findOneAndUpdate({_id: req.body.ID},{$set:{like: likers}},{new: true},(err,doc)=> {
                    });
                });
            }
            
            //add dislike
            Quote.findOne({_id: req.body.ID})
            .then((result) => {
                let dislikers = result.dislike
                dislikers.push(req.user.id)
                Quote.findOneAndUpdate({_id: req.body.ID},{$set:{dislike: dislikers}},{new: true},(err,doc)=> {
                    res.status(200).send();
                });
            });
        }
    });
});

app.post("/like-quote", authUser, (req,res)=> {
    
    let likeflag = false;
    let dislikeflag = false;

    Quote.findOne({_id: req.body.ID})
    .then((result) => {
        result.like.forEach((el) =>{
            if (el == req.user.id){
                likeflag = true;
            }
        });
        
        result.dislike.forEach((el) => {
            if (el == req.user.id){
                dislikeflag = true;
            }
        });

        if (likeflag === true){
            //already liked
            res.status(400).send();

        }
        else{
            //if disliked?
            if(dislikeflag === true){
                //remove dislike
                Quote.findOne({_id: req.body.ID})
                .then((result) => {
                    let dislikers = result.dislike
                    dislikers.splice(dislikers.indexOf(req.body.ID),1);
                    Quote.findOneAndUpdate({_id: req.body.ID},{$set:{dislike: dislikers}},{new: true},(err,doc)=> {
                    });
                });
            }
            
            //add like
            Quote.findOne({_id: req.body.ID})
            .then((result) => {
                let likers = result.like
                likers.push(req.user.id)
                Quote.findOneAndUpdate({_id: req.body.ID},{$set:{like: likers}},{new: true},(err,doc)=> {
                    res.status(200).send();
                });
            });


        }
    });
});

app.post("/search-quote", (req,res) =>{
    if(req.body.type == "idSearch"){
        Quote.findOne({_id: req.body.data})
        .then((result) => {
            res.json(result).send();
        })
        .catch((err) => console.log("ID not found!"))
    }

    if(req.body.type == "authorSearch"){
        Quote.findOne({author: req.body.data.toUpperCase()})
        .then((result) => {
            res.json(result).send();
        })
        .catch((err) => console.log("Author not found!"))
    }

    if(req.body.type == "speacialSearch"){
        Quote.findOne({_id: req.body.data})
        .then((result) => {
            res.json(result).send();
        })
        .catch((err) => console.log("ID not found!"))
    }

});

app.post("/profile-list-quotes", authToken, (req,res) =>{

    if(req.body.type === "my"){
        if(req.body.LastQuote === null)
            Quote.find().where("author").equals(req.user.username).limit(2).exec((err,result) => {
                if (result != null){
                    res.json(result);
                }
                else{
                    res.status(400).send();
                }
            })
        else{
            if(req.body.action === "next"){
                Quote.find().where("_id").gt(req.body.LastQuote).where("author").equals(req.user.username).limit(2).exec((err,result) => {
                    if (result != null){
                        res.json(result);
                    }
                    else{
                        res.status(400).send();
                    }
                })
            }

            if(req.body.action === "previous"){
                Quote.find().where("_id").lt(req.body.FirstQuote).where("author").equals(req.user.username).sort({_id: -1}).limit(2).exec((err,result) => {
                    if (result != null){
                        res.json(result.reverse());
                    }
                    else{
                        res.status(400).send();
                    }
                })
            }
        }
    }

    if(req.body.type === "liked"){
        if(req.body.LastQuote === null){
            Quote.find({like: {"$in":[req.user.id]}}).limit(2).exec((err,result) => {
                if (result != null){
                    res.json(result);
                }
                else{
                    res.status(400).send();
                }
            })
        }
        else{
            if(req.body.action === "next"){
                Quote.find({like: {"$in":[req.user.id]}}).where("_id").gt(req.body.LastQuote).limit(2).exec((err,result) => {
                    if (result != null){
                        res.json(result);
                    }
                    else{
                        res.status(400).send();
                    }
                })
            }

            if(req.body.action === "previous"){
                Quote.find({like: {"$in":[req.user.id]}}).where("_id").lt(req.body.FirstQuote).sort({_id: -1}).limit(2).exec((err,result)  => {
                    if (result != null){
                        res.json(result.reverse());
                    }
                    else{
                        res.status(400).send();
                    }
                })
            }
        }
    }

    if(req.body.type === "disliked"){
        if(req.body.LastQuote === null){
            Quote.find({dislike: {"$in":[req.user.id]}}).limit(2).exec((err,result) => {
                if (result != null){
                    res.json(result);
                }
                else{
                    res.status(400).send();
                }
            })
        }
        else{
            if(req.body.action === "next"){
                Quote.find({dislike: {"$in":[req.user.id]}}).where("_id").gt(req.body.LastQuote).limit(2).exec((err,result) => {
                    if (result != null){
                        res.json(result);
                    }
                    else{
                        res.status(400).send();
                    }
                })
            }
            if(req.body.action === "previous"){
                Quote.find({dislike: {"$in":[req.user.id]}}).where("_id").lt(req.body.FirstQuote).sort({_id: -1}).limit(2).exec((err,result) => {
                    if (result != null){
                        res.json(result.reverse());
                    }
                    else{
                        res.status(400).send();
                    }
                })
            }
        }
    }

})

app.get("/profile-get-quote-number", authToken,(req,res) =>{
    
    Quote.find().where("author").equals(req.user.username).count()
    .then((count)=>{
        res.json(count);
    })


});

app.post("/profile-delete-quote", authToken, (req,res) => {
    Quote.findOne({_id:req.body._id})
    .then((result)=>{
        if(result.author === req.user.username){
            console.log(req.body._id);
            Quote.remove({_id: req.body._id})
            .then((err)=>{
                res.status(210).send();
            });
        }
    })
    .catch(err=>{
        return;
    })
});

function authToken(req,res,next){
    const authHeader = req.headers["cookie"];
    if (authHeader != null){
        token = authHeader.split(" ")
        let formatToken = "";
        token.forEach(element => {
            if (element.search("token") != -1){
                formatToken = element.split("=")[1];
            }
        });

        if (formatToken != ""){
            jwt.verify(formatToken,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
                if (err){
                    console.log(err);
                    req.user = "";
                }
                else{
                req.user = user;
            }
            });
            next();
        }
        else{
            req.user = "";
            next();
        }
    }
    else{
        req.user = "";
        next();
    }
}
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, ".", "build" , "index.html"));
  });