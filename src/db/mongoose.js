const mongoose = require('mongoose')

let db_url; 

if(process.env.NODE_ENV === 'production') {  

  db_url = process.env.MONGODB_URI
// } else {

/*   db_url = process.env.LOCAL_DB */
/*  db_url = process.env.LOCAL_DB */
}
db_url = process.env.MONGODB_URI
console.log(db_url)

mongoose.connect(db_url , {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: false,
  useFindAndModify: false,
})





