var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://<test>:<test>@ds017195.mlab.com:17195/todo');


//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


//var data=[{item: 'get milk'}, {item: 'walk dog'},{item:'kick some coding '}];

var urlencodedParser = bodyParser.urlencoded({extended})
module.exports = function(app){

    app.get('/todo', function(req,res){ 

        //get data from mongodb and pass it to view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos : data});
        });
       
        
        //for showing a view
 
    });



    app.post('/todo', urlencodedParser, function(req,res){ 

        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            
            res.json(data);

        })
        
 
    });

    app.delete('/todo/:item', function(req,res){  
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);

        });
        
 
    });



};