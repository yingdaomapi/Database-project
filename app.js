const http=require('http')
const url=require('url')
const fs=require('fs');
const express = require("express");
const { runInNewContext } = require('vm');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static("./templates"));
app.use(bodyParser.urlencoded({extended:false}));


const IndexOverview=fs.readFileSync('templates/index.html','utf-8');
app.get('/',(req,res)=>{
    res.status(200).send(IndexOverview)
})
//submit
app.post('/submit',(req,res)=>{
    const username=req.body.username;
    const singer=req.body.singer;
    const rating =req.body.rating;
    const comments=req.body.comments;
    let values=[username,singer,rating,comments];
    let sql = "INSERT INTO feedback(username,singer,rating,comments)VALUES($1,$2,$3,$4)";
    pool.query(sql,values,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else {
            console.log(result);
            }
        })
    const boardOverview=fs.readFileSync('templates/board.html','utf-8');
    res.status(200).send(boardOverview);
})
//check
    app.get("/feedbacks/:id",(req,res)=>{
        let sql = `SELECT * FROM feedback WHERE id = ${req.params.id}`;
        pool.query(sql,(err,result)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
                
                console.log(result);
                res.send(result);
            }
        })
    })
    //delete
    app.get("/delete/:id",(req,res)=>{
        let sql = `DELETE FROM feedback WHERE id = ${req.params.id}`;
        pool.query(sql,(err,result)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
              console.log(result);
              res.end(`${req.params.id}`+' is deleted');
            }``
        })
    })
//connect database
const pg = require('pg')

const con={
    host:'localhost',
    user:'postgres',
    password:'01137716',
    port:'5432',
    database:'postgres'
}
const pool= new pg.Pool(con);
pool.connect(function(err)
{
    if(err)
    {
        return console.error('数据库连接失败!');
    }
    return console.log('数据库连接成功');
})




app.listen(8000,'127.0.0.1',()=>{
    console.log('Listening  to port 8000');
});