module.exports = {
  mergeDateAndTime: function(date, time) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                    time.getHours(), time.getMinutes(), time.getSeconds());
  },

  fixInput: function(date) {
    var offset = date.getTimezoneOffset();

    return new Date(date.getTime() + offset * 60 * 1000);
  }
};
