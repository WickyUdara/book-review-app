import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"books",
    password:"Coconuttree21816*",
    port:5432,

});
db.connect();

app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static("public"));

async function getBooks(){
    const result = await db.query("SELECT * FROM read_books ORDER BY id DESC");
    console.log(result.rows);
    return result.rows;
    
};



app.get("/", async(req,res)=>{
    const books = await getBooks();
    res.render("index.ejs",{
        books:books
    });
});

app.get("/add" ,async(req,res)=>{
    res.render("add.ejs");
});


app.post("/add",async(req,res)=>{
    const name = req.body.name;
    const isbn = req.body.isbn;
    const review = req.body.review;
    const author = req.body.author;
    const rating = req.body.rating;

    try{
        const result = await db.query("INSERT INTO read_books(name,author_name,review,isbn,rating) VALUES($1,$2,$3,$4,$5)",[
            name,author,review,isbn,rating
        ]);
        res.redirect("/");
    }catch(err){
        console.log(err);
    }
});

app.post("/edit",async(req,res)=>{
    const id = req.body.book_id;
    console.log(id);

    try{
        const result = await db.query("SELECT * FROM read_books WHERE id = $1;",[id]);
        console.log(result.rows[0]);
        res.render("edit.ejs",{
            book:result.rows[0]
        });
    }catch(err){
        console.log(err);
    }
});
app.post("/update",async(req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const isbn = req.body.isbn;
    const review = req.body.review;
    const author = req.body.author;
    const rating = req.body.rating;

    try{
        const result = await db.query("UPDATE read_books SET name = $1,author_name = $2,review = $3,isbn = $4,rating = $5 WHERE id = $6",[
            name,author,review,isbn,rating,id
        ]);
        res.redirect("/");
    }catch(err){
        console.log(err);
    }

});

app.post("/delete",async(req,res)=>{
    const id = req.body.book_id;
    console.log(id);
    try{
        await db.query("DELETE FROM read_books WHERE id = $1;",[id]);
        res.redirect("/");
    }catch(err){
        console.log(err);
    }
});

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
});