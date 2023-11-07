var mysql = require('mysql2');

module.exports = function createTodoBackend() {
  function query(query, callback) {

    var con = mysql.createConnection({
      host: "localhost",
      user: 'root',
      password: 'password_123',
      database: 'todos_db'
    });

    con.connect(function (err, client, done) {
      // if (err) throw err;
      console.log("Connected!");
      //NOTE :  UNCOMMENT AND RUN BELOW STATEMENT ONLY FIRST TIME WHEN RUNNING THE APP.
      // var sql = "CREATE TABLE todos (orderTodo INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), completed VARCHAR(255))";
      // con.query(sql, function (err, result) {
      //   if (err) throw err;
      //   console.log("Table created");
      // });

      if (err) {
        callback(err);
        return err;
      }

      con.query(query, function(err, result) {
        if (err) {
          callback(err);
          return err;
        }
        console.log(result)
        callback(null, result);
      });
    });
  }

  return {

    all: function (callback) {
      query('SELECT * FROM todos', callback);
    },

    get: function (id, callback) {
      query(`SELECT * FROM todos WHERE id = ${id}`, function (err, rows) {
        callback(err, rows && rows[0]);
      });
    },

    create: function (title, order, callback) {
      console.log(title)
      query(`INSERT INTO todos (title, completed) VALUES ('${title}', false); `, function (err, rows) {
        console.log('rows ', rows)
        console.log('err ', err)
        callback(err, rows && rows[0]);
      });
    },

    update: function (id, properties, callback) {
      
      var updateQuery = 
        `UPDATE todos SET title = '${properties.title}' WHERE orderTodo = ${id}` ;
      query(updateQuery, function (err, rows) {
        callback(err, rows && rows[0]);
      });
    },

    delete: function (id, callback) {
      query(`DELETE FROM todos where orderTodo = ${id}`, function (err, rows) {
        callback(err, rows && rows[0]);
      });
    },

    clear: function (callback) {
      query('DELETE FROM todos RETURNING *', [], callback);
    }
  };
};
