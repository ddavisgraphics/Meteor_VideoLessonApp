// SEO CONFIG Settings
// ======================================================

SEO.config({
    title: 'Time Tracker App - David Davis',
    meta: [
        { "keywords" : "Time Tracker, Tracking, Time, hours, work, proejct management"},
        { "description" : "Time Tracking application written in Meteor" },
        { "author": "David J. Davis"}
    ],
});


// Customers Logic
// ======================================================

Template.customers.helpers({
  allCustomers:function(){
    return Customers.find();
  },
  fullname:function(){
    return this.firstname + " " + this.lastname;
  },
  phone: function(){
    return this.phone;
  },
  website: function(){
    return this.website;
  },
  email: function(){
    return this.email;
  },
  company: function(){
    return this.companyName;
  },
});

Template.customers.events({
  "click .delete": function(e){
    e.preventDefault();
    Customers.remove(this._id);
  },
  "click .edit": function(){
    Session.set("customerID", this._id);
  }
});

Template.editCustomer.helpers({
  customerID: function(){
    var id = Session.get('customerID');
    return Customers.findOne(id);
  }
});

// Projects Logic
// ======================================================

Template.registerHelper('customerMenu', function(){
  var customers = Customers.find().fetch();
  var menu = [];

  // loop through customers to build menu
  for(var i = 0; i < customers.length; i++){
    var customer   = customers[i];
    var fullname   = customer['firstname'] + " " + customer['lastname'];
    var customerID = customer['_id'];
    var company    = customer['companyName'];
    var label      = fullname + " - " + company;
    var listObject = { label : label, value : customerID};
    menu.push(listObject);
  }

  return menu;
});

Template.projects.helpers({
  allProjects:function(){
    return CustomerProjects.find();
  },
  name:function(){
    return this.projectName;
  },
  projectScope:function(){
    return this.scope;
  },
  completed:function(){
    return (this.completed ? "Yes" : "No");
  },
  description:function(){
    return this.description;
  }
});

Template.projects.events({
  "click .delete": function(e){
      e.preventDefault();
      CustomerProjects.remove(this._id);
  },
  "click .edit" : function(e){
      Session.set("currentProject", this._id);
  }
});

Template.editProject.helpers({
  projectID: function(){
    var id = Session.get('currentProject');
    return CustomerProjects.findOne(id);
  },
  feedback: function(){
    var id = Session.get('currentProject');
    if(!id){
      return "No Project has been selected!";
    }
  }
});

// Time Tracking
// ======================================================

Template.timeTracker.helpers({
    dropdownCustomer: function(){
        return Customers.find().fetch();
    },
    fullname:function(){
        return this.firstname +" "+ this.lastname;
    },
    id:function(){
        return this._id;
    },
    feedback: function(){
        var id = Session.get('selectedCustomer');
        if(!id){
            return "No customer has been selected.  Please select one from the dropmenu.";
        }
    },
    selectProject:function(){
        var id = Session.get('selectedCustomer');
        if(!id){
            return null;
        }
        else {
            return CustomerProjects.find({customerID:id}).fetch();
        }
    },
});

Template.timeTracker.events({
  'click .helpToggle':function(e){
      e.preventDefault();
      $('.help').fadeToggle();
  },
  'change .customerMenu':function(e){
      var value = $(event.target).val();
      Session.set('selectedCustomer', value);
      $('.selectProject').removeClass('hidden');
  },
  'change .projectMenu':function(e){
      var value = $(event.target).val();
      Session.set('selectedProject', value);
      $('.startButton').attr('disabled', false).removeClass('disabled');
  },
  'click .startButton':function(e){
      e.preventDefault();
      var date = new Date();
      var startTime = date.toLocaleTimeString();

      Session.set('startTime', startTime);
      $('.stopButton').attr('disabled', false).removeClass('disabled');
  },
  "click .stopButton":function(event){
      event.preventDefault();
      var date = new Date();
      var endTime = date.toLocaleTimeString();

      Session.set("endTime", endTime);
      $('.projectWork').show();

      // set the data in the form
      $('.projectID').val(Session.get('selectedProject'));
      $('.startTime').val(Session.get('startTime'));
      $('.endTime').val(Session.get('endTime'));
  }
});

Template.timeTracker.rendered = function(){
  $('.startButton, .stopButton').attr('disabled', true).addClass('disabled');
}