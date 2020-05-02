const fs = require ('fs')
const express = require('express')
const session = require('express-session');

const path = require('path')
var bodyParser = require('body-parser')
const app = express()

var expressValidator = require('express-validator');




app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views') )

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret:'sec',saveUninitialized:false, resave:false,usersession:""}));


//var port = process.env.PORT || 3000;

//adding the following line after the body was parsed  
app.use(expressValidator());  
if(process.env.PORT){
app.listen(process.env.PORT)
} 
else {
    app.listen(3000);
}


//var port = process.env.PORT || 3000; 

var mflag=false;
var found ;
var success;
var movie= '';
var searchflag=false;

let mywatchlist=[""];
//var usersession;
var logged;

let search= ['Fight Club', 'The Dark Knight', 'God Father I', 'God Father II','Scream','Conjuring']
let upper=['FIGHT CLUB','THE DARK KNIGHT','GOD FATHER I','GOD FATHER II','SCREAM','CONJURING']




var errors ;
app.locals.errors;

let user ={
    username:'' ,
    password:'',
    watchlist:['']
    }



var f= 'Fight Club'
var c='Conjuring'
var s='Scream'
var k='The Dark Knight'
var g1='God Father I'
var g2 ='God Father II'


var sandra;

//load tasks from a file
let loadUser = function(){
    try {
        let BufferedData = fs.readFileSync('user.json')
    let StringData = BufferedData.toString()
    UserArray = JSON.parse(StringData) //becomes an object 
    return UserArray
    } catch (error) {
        return []
    }
    
}

/*let loadmovie = function(){
    try {
        let BufferedData1 = fs.readFileSync('movie.json')
    let StringData1 = BufferedData1.toString()
    MoviesArray = JSON.parse(StringData1) //becomes an object 
    return MoviesArray
} catch (error) {
    return []
}
    
    
}*/








//add a new user
let addUser = function(user){
   //load tasks array from file
     UserArray = loadUser()
   //push a new task task
     UserArray.push(user)
   //save array 
    
    fs.writeFileSync('user.json', JSON.stringify(UserArray))

}

/*let addMovie= function(movie){
    //load tasks array from file
    MoviesArray = loadmovie()
    //push a new task task
      MoviesArray.push(movie)
    //save array 
     
     fs.writeFileSync('movie.json', JSON.stringify(MoviesArray))

}*/




let searchreg =function(Key, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].username == Key) {
            return true;
        }
    }
    return false;
}

let searchmovie=function(Key, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i] == Key) {
            return true;
        }
    }
    return false;
}




let searchlog =function(Keyusername,keypassword, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].username== Keyusername && myArray[i].password==keypassword ){
            return true;
        }
    }
    return false;
}









app.get('/', function(req,res){
    
        res.render('login',{errors:[],found:false,success:false})
        console.log('intially going to login page1')
        
    


    
})

app.get('/login', function(req,res){
    UserArray=loadUser(); 
    
    res.render('login',{errors:[],found:false,success:true})
    console.log('intially going to login page2')
    
  


})

app.post('/', function(req,res){
    UserArray= loadUser();


    console.log('you have wrote your username and password in login page')
    //usersession=req.session;
    //usersession.username=(req.body).username;
   
    req.session.usersession=req.body.username;
    //console.log((req.body).username);
    //console.log(usersession.username);

    //form validator
    req.check('username', 'Username field is required').notEmpty();
    req.check('password', 'Password field is required').notEmpty();
    req.check('username', 'Username must be an email').isEmail();
   // req.check('password', 'Password must be at least 5 charachters').islength({min:5});

   //check Errors
   errors=req.validationErrors();
    if(errors.length>0){
        res.render('login',{errors:errors,found:false,success:false})
        console.log('you have errors')

    }

    else{

    if(searchlog((req.body).username,(req.body).password,UserArray)==true){
        
        res.render('home')
        console.log('you are redirected to home succesfully')
    }
    else{
        res.render('login',{errors:errors,found:true,success:false})
        console.log('your username or password isnot correct')
    }
    
}
    
    

})







app.post('/login', function(req,res){
    UserArray= loadUser();
    console.log('you have wrote your username and password in login page')

    req.session.usersession=req.body.username;

    //form validator
    req.check('username', 'Username field is required').notEmpty();
    req.check('password', 'Password field is required').notEmpty();
    req.check('username', 'Username must be an email').isEmail();
   // req.check('password', 'Password must be at least 5 charachters').islength({min:5});

   //check Errors
   errors=req.validationErrors();
    if(errors.length>0){
        res.render('login',{errors:errors,found:false,success:false})
        console.log('you have errors')

    }

    else{

    if(searchlog((req.body).username,(req.body).password,UserArray)==true){
        
        res.render('home')
       
      //usersession=req.session;
       //usersession.username=req.body.username;
      
      
       
      console.log('you are redirected to home succesfully')
    }
    else{
        res.render('login',{errors:errors,found:true,success:false})
        console.log('your username or password isnot correct')
    }
    
}
    
    

})

//when pressing the button i dont have an account. will redirect me to the registeration page
app.get('/registration', function(req,res){ 
    res.render('registration', {errors:[],found:false})
    console.log('you clicked you donot have an account')
})
// <button id="watchlist1" class="btn btn-secondary ml-3">Add to Watchlist</button>


app.post('/register', function(req,res){ //when pressing the button register
   UserArray= loadUser();
   console.log('you clicked register')
    //form validator
    req.check('username', 'Username field is required').notEmpty();
    req.check('password', 'Password field is required').notEmpty();
    req.check('username', 'Username must be an email').isEmail();
   // req.check('password', 'Password must be at least 5 charachters').islength>5;
          
    //check Errors
    errors=req.validationErrors();

    if(errors.length>0){
    res.render('registration', {errors:errors,found:false})
    console.log('you have made some errors during registeration')
    
}
    
    else{

    if(searchreg((req.body).username,UserArray)==false){
    
      //  req.session.usersession=req.body.username;
            user1= {username:req.body.username,
                    password:req.body.password,
                    watchlist:['']
                }
            addUser(user1)
            res.redirect('login')
            //res.render('login',{errors:[],found:false,success:true})
            
            // console.log(req.session)

            console.log('you havenot made any erros, success!')
            
         }
    else{
        res.render('registration', {errors:[],found:true})
        console.log('no errors but username is already taken')
        

        

    }

    
    
    
    }
    

    

})


app.get('/action', function(req,res){ 

  
    res.render('action')
  
})

var j;

app.get('/fightclub', function(req,res){ 

   
    res.render('fightclub',{mflag:false})
  
})
app.post('/fc', function(req,res){ 
    mflag=false;
    UserArray=loadUser();
    
    for(var i = 0; i < UserArray.length; i++) {
    
    if(req.session.usersession==(UserArray[i]).username)
    {
        console.log((UserArray[i]).watchlist);
        if(searchmovie('Fight Club',((UserArray[i]).watchlist))==false){
   
      ((UserArray[i]).watchlist).push(f);
       fs.writeFileSync('user.json', JSON.stringify(UserArray));
       console.log((UserArray[i]).watchlist);

        }
        else{
            mflag=true;

        }
    }

    }
    
    res.render('fightclub',{mflag:mflag})

})


app.post('/dk', function(req,res){ 

    mflag=false;
    UserArray=loadUser();
    
    for(var i = 0; i < UserArray.length; i++) {
    
    if(req.session.usersession==(UserArray[i]).username)
    {
        console.log((UserArray[i]).watchlist);
        if(searchmovie('The Dark Knight',((UserArray[i]).watchlist))==false){
   
      ((UserArray[i]).watchlist).push(k);
       fs.writeFileSync('user.json', JSON.stringify(UserArray));
       console.log((UserArray[i]).watchlist);

        }
        else{
            mflag=true;

        }
    }

    }
    
    res.render('darkknight',{mflag:mflag})

})








 app.post('/gf1', function(req,res){ 
    mflag=false;
    UserArray=loadUser();
    
    for(var i = 0; i < UserArray.length; i++) {
    
    if(req.session.usersession==(UserArray[i]).username)
    {
        console.log((UserArray[i]).watchlist);
        if(searchmovie('God Father I',((UserArray[i]).watchlist))==false){
   
      ((UserArray[i]).watchlist).push(g1);
       fs.writeFileSync('user.json', JSON.stringify(UserArray));
       console.log((UserArray[i]).watchlist);

        }
        else{
            mflag=true;

        }
    }

    }
    
    res.render('godfather',{mflag:mflag})

})

 app.post('/gf2', function(req,res){ 
    mflag=false;
    UserArray=loadUser();
    
    for(var i = 0; i < UserArray.length; i++) {
    
    if(req.session.usersession==(UserArray[i]).username)
    {
        console.log((UserArray[i]).watchlist);
        if(searchmovie('God Father II',((UserArray[i]).watchlist))==false){
   
      ((UserArray[i]).watchlist).push(g2);
       fs.writeFileSync('user.json', JSON.stringify(UserArray));
       console.log((UserArray[i]).watchlist);

        }
        else{
            mflag=true;

        }
    }

    }
    
    res.render('godfather2',{mflag:mflag})

})
 app.post('/sc', function(req,res){ 
    mflag=false;
    UserArray=loadUser();
    
    for(var i = 0; i < UserArray.length; i++) {
    
    if(req.session.usersession==(UserArray[i]).username)
    {
        console.log((UserArray[i]).watchlist);
        if(searchmovie('Scream',((UserArray[i]).watchlist))==false){
   
      ((UserArray[i]).watchlist).push(s);
       fs.writeFileSync('user.json', JSON.stringify(UserArray));
       console.log((UserArray[i]).watchlist);

        }
        else{
            mflag=true;

        }
    }

    }
    
    res.render('scream',{mflag:mflag})

})
 app.post('/cj', function(req,res){ 
    mflag=false;
    UserArray=loadUser();
    
    for(var i = 0; i < UserArray.length; i++) {
    
    if(req.session.usersession==(UserArray[i]).username)
    {
        console.log((UserArray[i]).watchlist);
        if(searchmovie('Conjuring',((UserArray[i]).watchlist))==false){
   
      ((UserArray[i]).watchlist).push(c);
       fs.writeFileSync('user.json', JSON.stringify(UserArray));
       console.log((UserArray[i]).watchlist);

        }
        else{
            mflag=true;

        }
    }

    }
    
    res.render('conjuring',{mflag:mflag})

})

 


app.get('/darkknight', function(req,res){ 
    
    res.render('darkknight',{mflag:false})
  
})



app.get('/horror', function(req,res){ 
    res.render('horror')
  
})

app.get('/scream', function(req,res){ 
    res.render('scream',{mflag:false})
  
})

app.get('/conjuring', function(req,res){ 
    res.render('conjuring',{mflag:false})
  
})


app.get('/drama', function(req,res){ 
    res.render('drama')
  
})


app.get('/godfather', function(req,res){ 
    res.render('godfather',{mflag:false})
  
})

app.get('/godfather2', function(req,res){ 
    res.render('godfather2',{mflag:false})
  
})


app.get('/watchlist', function(req,res){ 

    for(var i = 0; i < UserArray.length; i++) {
        mywatchlist=['']
    
        if(req.session.usersession==(UserArray[i]).username)

        {
            
            res.render('watchlist',{mywatchlist:UserArray[i].watchlist})

        }

      //  res.render('watchlist',{mywatchlist:{}})
    }




    
  
})

app.post('/search', function(req,res){ 

   let searchfound=[ ]
   searchflag=false


    for(var i = 0; i < search.length; i++) {

          //  (req.body.Search).toUpperCase()
            if(upper[i].includes((req.body.Search).toUpperCase())){
                console.log('da5al')

                searchfound.push(search[i])
                console.log(searchfound)


            }
            

    }
    if(searchfound.length==0){
        searchflag=true;
    }



    res.render('searchresults',{searchfound:searchfound, searchflag:searchflag})

    console.log(searchflag)
  
})



