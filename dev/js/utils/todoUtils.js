var request = require('superagent');

module.exports = {
  createTodo: function(token, options) {
    return new Promise(function(resolve, reject) {
      request
      .post('/create-todo')
      .set('Authorization', 'Bearer ' + token)
      .send(options)
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }

        return resolve();
      });
    });
  },

  getTodos: function(token) {
    return new Promise(function(resolve, reject) {
      request
      .get('/get-todos')
      .set('Authorization', 'Bearer ' + token)
      .end(function(err, res) {
        if(err) {
          return reject(err);
        }

        return resolve(JSON.parse(res.text));
      });
    });
  }
};
