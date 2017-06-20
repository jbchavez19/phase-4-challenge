const pg = require('pg')

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

// Query helper function
const query = function(sql, variables, callback){
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  client.query(sql, variables, function(error, result){
    if (error){
      console.log('QUERY <- !!ERROR!!')
      console.error(error)
      callback(error)
    }else{
      console.log('QUERY <-', JSON.stringify(result.rows))
      callback(error, result.rows)
    }
  })
}

const getAlbums = function(callback) {
  query("SELECT * FROM albums", [], callback)
}

const getAlbumsByID = function(albumID, callback) {
  query("SELECT * FROM albums WHERE id = $1", [albumID], callback)
}

const createUser = function(user, callback) {
  query(
    "INSERT INTO users (email, name, password) VALUES ($1, $2, $3)",
    [user.email, user.name, user.password],
    callback
  )
}

const findUserByEmail = function(user, callback) {
  query("SELECT * FROM users WHERE email = $1", [user.email], callback)
}

const findUserById = function(id, callback) {
  query("SELECT * FROM users WHERE id = $1", [id], callback)
}

module.exports = {
  getAlbums,
  getAlbumsByID,
  createUser,
  findUserByEmail,
  findUserById,
}
