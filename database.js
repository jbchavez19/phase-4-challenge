const pg = require('pg')

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

// Query helper function
const query = function(sql, variables, callback){
  client.query(sql, variables, function(error, result){
    if (error){
      console.error(error)
      callback(error)
    }else{
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

const getMostRecentReviews = function(limit, callback) {
  const sql = "SELECT" +
    " albums.id AS album_id," +
    " albums.title AS album_title," +
    " date_created AS date," +
    " review," +
    " users.id AS author_id," +
    " users.name AS author" +
    " FROM reviews" +
    " INNER JOIN users ON reviews.user_id = users.id" +
    " INNER JOIN albums ON reviews.album_id = albums.id" +
    " ORDER BY reviews.id" +
    " DESC" +
    " LIMIT $1"
  query(sql, [limit], callback)
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
  getMostRecentReviews,
  createUser,
  findUserByEmail,
  findUserById,
}
