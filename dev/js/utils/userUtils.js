var request = require('superagent');

module.exports = {
  createUser: function(username, password) {
    return new Promise(function(resolve, reject) {
      request
      .post('/create-user')
      .send({username: username, password: password})
      .end(function(err, res) {
        if(err) {
          if(res.status === 400) {
            var json = JSON.parse(res.text);
            return reject(new Error(json.error));
          }

          return reject(err);
        }

        return resolve(JSON.parse(res.text));
      });
    });
  },

  getUser: function(username, password) {
    return new Promise(function(resolve, reject) {
      request
      .post('/get-user')
      .send({username: username, password: password})
      .end(function(err, res) {
        if(err) {
          if(res.status === 400) {
            var json = JSON.parse(res.text);
            return reject(json.error);
          }

          return reject(err.toString())
        }

        return resolve(JSON.parse(res.text));
      });
    });
  }
};
