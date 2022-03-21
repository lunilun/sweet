const Pool = require('pg').Pool;
var msg;

const pool = new Pool({
    user: "dabin",
    password: "asd17688!!",
    database: "kanmi", 
    host: "localhost",
    port: 5432
});

//세이브
exports.Save = async function(req) {
    try{
        var gcontent = req.body.content;
        var gtitle = req.body.title;
        var gdate = req.body.date;
        var gtype = req.body.type;
        var gimg = req.body.img;

        await pool.query(`insert into ${gtype}(title,date,substance,img) values('${gtitle}','${gdate}','${gcontent}','${gimg}');`)
        msg='save';
        return msg;
    }catch(err){
        console.log(err);
    }
}
//로드
exports.Load = async function(req) {
    try{
        var gtype = req.body.type;
        const loadItems = await pool.query(`select * from ${gtype}`);
        return loadItems.rows;
    }catch(err){
        console.log(err.message);
    }
}
//뷰
exports.View = async function(req) {
    try{
        var gtype = req.body.type;
        var gtitle = req.body.title;

        const viewItems = await pool.query(`select * from ${gtype} where title='${gtitle}'`);
        return viewItems.rows;
    }catch(err){
        console.log(err);
    }
}
//삭제
exports.Delete = async function(req) {
    try{
        var gtitle = req.body.title;
        var garea = req.body.area;
        var gtype = req.body.type;
        await pool.query(`delete from ${gtype} where title='${gtitle}' and substance='${garea}'`);
        msg='delete';
        return msg;
    }catch(err){
        console.log(err.message);
    }
}