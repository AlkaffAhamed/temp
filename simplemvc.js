const express = require("express")
const app = express()
//const bodyParser = require("body-parser")
const { json } = require("body-parser")
const path = require("path")

// To parse JSON format
//app.use(express.json())
//app.use(bodyParser.json())
app.use(json())
// Database 
const {Pool} = require("pg")

const connectionInfo = `postgres://postgres:admin@localhost:5432/simplemvc`
const pool = new Pool({connectionString: connectionInfo})

// pool.query(
//     "SELECT * FROM user_details;",
//     [],
//     function (err, res)
//     {
//         if(err)
//         {
//             console.log(err)
//             process.exit(1)
//         }
//         console.log(res.rows)
//         console.log(res.rowCount)
//         process.exit(0)
//     }
// )

function login(u,p)
{
    let qry = `SELECT * FROM user_details t where t.userid = '${u}' AND t.pwd = '${p}';`
    //console.log(u,p,qry)

    pool.query(
        qry,
        [],
        function (err, res)
        {
            if(err)
            {
                console.log(err)
                process.exit(1)
            }
            let isSuccess = res.rowCount
            if (isSuccess === 1)
            {
                return res.rows[0]
            }
            else
            {
                return false
            }
        }
    )
}

app.get("/login", (req, res) => 
{
    res.status(200).sendFile(path.resolve(__dirname, "login.html"))
})

app.post("/login", (req, res) => 
{
    console.log(req)
    let u = req.body.name
    let p = req.body.pwd
    let l = login(u,p)
    console.log(u,p,l)
    if(l)
    {
        res.status(200).send(l)
    }
    else
    {
        res.status(401).send("Login failed")
    }
})

app.listen(5000, () =>
{
    console.log("SERVER listening on http://localhost:5000/")
})

