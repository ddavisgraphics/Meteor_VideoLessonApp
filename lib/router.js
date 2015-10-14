Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', function () {
    this.render('home');
    }, { name: 'home'
});

Router.route('/customer', function () {
    this.render('customers');
    }, { name: 'customers'
});

Router.route('/addCustomer', function () {
    this.render('addCustomer');
    }, { name: 'addCustomer'
});

Router.route('/editCustomer', function () {
    this.render('editCustomer');
    }, { name: 'editCustomer'
});

Router.route('/projects', function() {
    this.render('projects');
    }, {name : 'projects'
});

Router.route('/newProject', function(){
    this.render('newProject');
   }, {name: 'newProject'
});


Router.route('/editProject', function(){
    this.render('editProject');
   }, {name: 'editProject'
});

Router.route('/timeTracker', function(){
    this.render('timeTracker');
    }, {name:'timeTracker'
});
