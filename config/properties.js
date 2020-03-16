
console.log('DDBB', process.env.DB )


module.exports = {
    PORT : process.env.PORT || 4000,
    DB : process.env.DB || `mongodb://localhost:27017/crud-mean`
}