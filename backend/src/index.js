import express from "express"

const app = express()
const port = process.env.PORT || 8000; 
app.get('/', (req, res)=>{
    res.send("Helloworld")
})

app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
})
