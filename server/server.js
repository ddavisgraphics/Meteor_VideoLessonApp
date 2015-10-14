Meteor.methods({
  clearDB: function() {
    Test.remove({});
  }
});