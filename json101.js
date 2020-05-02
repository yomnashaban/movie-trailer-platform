const fs = require ('fs')




let userJSON = JSON.stringify(user)


//to transform from JSON to object 
let parseData = JSON.parse(userJSON);
//console.log(parsedData.author)

//if the name is not there before, it will create it. if present, then will overwrite
fs.writeFileSync('user.json', userJSON)

let data = fs.readFileSync('user.json') //binary data
let dataString = data.toString()
let parsedData = JSON.parse(dataString)
//console.log(parsedData.title)


let movie ={name:'Hunger Games'}

let movieJSON = JSON.stringify(movie)


//to transform from JSON to object 
let parseData1 = JSON.parse(movieJSON);
//console.log(parsedData.author)

//if the name is not there before, it will create it. if present, then will overwrite
fs.writeFileSync('movie.json', movieJSON)

let data1 = fs.readFileSync('movie.json') //binary data
let dataString1 = data1.toString()
let parsedData1 = JSON.parse(dataString1)
//console.log(parsedData.title)