var request = require('superagent');

window.createUser = function(username, password) {
  request
  .post('/create-user')
  .send({username: username, password: password})
  .end(function(err, res) {
    if(err) {
      console.log(res.text);
      throw new Error(err);
    }

    console.log('User created!');
  });
};

window.getUser = function(username, password) {
  request
  .post('/get-user')
  .send({username: username, password: password})
  .end(function(err, res) {
    if(err) {
      console.log(res.text);
      throw new Error(err);
    }

    var json = JSON.parse(res.text);
    console.log(json);
  });
};

window.getUserTest = function(token) {
  request
  .get('/get-user-test')
  .set('Authorization', 'Bearer ' + token)
  .end(function(err, res) {
    if(err) {
      throw new Error(err);
    }

    console.log(res.text);
  });
};
