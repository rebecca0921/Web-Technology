const http=require('http');
const fs=require('fs');
const { URLSearchParams } = require('url');

const mongoose = require('mongoose');
const internal = require('stream');
mongoose.connect('mongodb://127.0.0.1:27017/college')
        .then(function(){
            console.log('DB Connected')
        })
const studentSchema = new mongoose.Schema({name:String, password:String, age:String, mobileno:String, email:String, gender:String, state:String});
const studentmodel = mongoose.model('students',studentSchema);

const server = http.createServer(function (req,res){
    if(req.url==='/'){
        res.writeHead(200,{'Content-Type':'text/html'})
        fs.createReadStream('signup.html').pipe(res);
    }
    else if(req.url==='/signup' && req.method==='POST'){
        var rawdata ='';
        req.on('data',function(data){
            rawdata+= data;
        })
        
        req.on('end',function(){
            var formdata = new URLSearchParams(rawdata);
            res.writeHead(200,{'Content-Type':'text/html'})
            studentmodel.create({name:formdata.get('name'), 
                                password:formdata.get('password'), 
                                age:formdata.get('age'), 
                                mobileno:formdata.get('mobileno'), 
                                email:formdata.get('email'),
                                gender:formdata.get('gender'),
                                state:formdata.get('state')
                            })
            res.write('Data Saved Sucessfully')
            res.end();
        })
    }
    else if(req.url === '/view' && req.method === 'GET'){
        res.writeHead(200,{'Content-Type':'text/html'})
        studentmodel.find().then(function(students){
            res.write("<table border=1 cellspacing=0 width=400>");
            res.write("<tr><th>Name</th><th>Password</th><th>Age</th><th>Mobileno</th><th>Email</th><th>Gender</th><th>State</th></tr>");
            students.forEach(student=>{
                res.write("<tr>");
                res.write("<td>"+student.name + "</td>");
                res.write("<td>"+student.password + "</td>");
                res.write("<td>"+student.age + "</td>");
                res.write("<td>"+student.mobileno + "</td>");
                res.write("<td>"+student.email + "</td>");
                res.write("<td>"+student.gender + "</td>");
                res.write("<td>"+student.state + "</td>");
                res.write( "</tr>");
            

            })
            res.end();
        })

    }
})
server.listen('8000',function(){
    console.log('server started at 8000');
})