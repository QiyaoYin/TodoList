const express = require('express');
const bodyParser = require('body-parser');
const List = require('./models/List');
const My = require('./models/My');
const app = express();
const jsonParser = bodyParser.json();

const whiteList = ['http://localhost:3000','http://192.168.0.109:3000','http://127.0.0.1:3000','https://yinqy.github.io','https://www.yinqy.github.io'];

app.use((req,res,next)=>{
    let origin = req.headers.origin
    let methods = req.method;
    if(whiteList.includes(origin)){
        //设置哪个源可以访问
        res.setHeader('Access-Control-Allow-Origin',origin);
        //res.setHeader('Access-Control-Request-Method','POST');
        //允许携带哪个头访问
        res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
        //允许哪个方法访问 对于简单请求的post get head方法好像不起作用
        res.setHeader('Access-Control-Allow-Methods',methods);
        //是否允许携带cookies
        res.setHeader('Access-Control-Allow-Credentials',true);
        /** 预检的存活时间 单位s 浏览器的同源策略，处于安全考虑 在跨域请求中会先发送一个OPTIONS方法的预检请求 如果允许跨域 第二次才会发送真正的请求 
         * 后端如果设置了存活时间 那么在这段时间内 第二个相同的请求就不用发送预检请求 加快了请求的速度
        */
        res.setHeader('Access-Control-Max-Age', 6)
        // 允许返回的头
        //res.setHeader('Access-Control-Expose-Headers', 'name')
        if (methods === 'OPTIONS') {
            res.send(200) // OPTIONS请求不做任何处理
        }else{
            next();
        }
    }
});

//插入数据
app.post('/submit',jsonParser,async (req,res,next)=>{
    const {deadline,title,description} = req.body;
    let result = {};
    try{
        await List.create({title,description,deadline});
        let todolist = await List.findAll({where: {status: 0},order: [['deadline', 'ASC']]});
        result.status = 200;
        result.message = todolist;
        res.json(result);
    }catch(e){
        next(e);
    }
});

//获取所有list
app.post('/getList',async (req,res,next)=>{
    let result = {};
    try{
        let todolist = await List.findAll({where: {status: 0},order: [['deadline', 'ASC']]});
        result.status = 200;
        result.message = todolist;
        res.json(result);
    }catch(e){
        next(e);
    }
});

//删除数据
app.post('/deleteTodo',jsonParser,async (req,res,next)=>{
    const {id} = req.body;
    let result = {};
    try{
        await List.update({status: 1},{where: {id}});
        let todolist = await List.findAll({where: {status: 0},order: [['deadline', 'ASC']]});
        result.status = 200;
        result.message = todolist;
        res.json(result);
    }catch(e){
        next(e);
    }
});

//获取体重列表体重
app.get('/getWeightList',async (req,res,next)=>{
    let result = {};
    try{
        let weightList = await My.findAll({attributes: ['cr_time', 'num']});
        result.status = 200;
        result.message = weightList;
        res.json(result);
    }catch(e){
        next(e);
    }
});

//增加体重
app.post('/addWeight',jsonParser,async (req,res,next)=>{
    let {num,cr_time} = req.body;
    let result = {};
    try{
        await My.create({num,cr_time});
        let weightList = await My.findAll({attributes: ['cr_time', 'num']});
        result.status = 200;
        result.message = weightList;
        res.json(result);
    }catch(e){
        next(e);
    }
});

//错误处理
app.use((err,req, res) => {
    //服务器发生错误状态码是500,err.massage保存错误信息
    res.status(500).send(err.message);
})

app.listen(4000,'0.0.0.0',()=>{
    console.log(`run successfully!${new Date().toLocaleDateString()}`);
});