// データベースに接続 --- (*1)
const NeDB = require("nedb");
const path = require("path");
const { Client } = require("pg");

module.exports = class dbAccess {
  constructor() {
    this.db = new NeDB({
      filename: path.join(__dirname, "userInfo.db"),
      autoload: true,
    });
  }
  insertData(name, password) {
    this.db.insert({
      name: name,
      password: password,
      stime: new Date().getTime(),
    });
  }

  async asyncPromiseLoginChk(inputName) {
    const result = await this.getNameAndPassword(inputName);
    //console.log(result);
    return result;
  }

  getNameAndPassword(inputName) {
    return new Promise((resolve) => {
      this.db.find({ name: inputName }, (error, docs) => {
        console.log("docs=", docs);
        console.log("docs.length=", docs.length);
        if (docs.length == 0) {
          resolve({ Name: "", Password: "" });
        } else {
          resolve({ Name: docs[0].name, Password: docs[0].password });
        }
        //resolve({'Name':docs[0].name, 'Password':docs[0].password});
      });
    });
  }

  async asyncPromiseLoginChkPostgresql(inputName) {
    const result = await this.getNameAndPasswordPostgresql(inputName);
    return result;
  }

  getNameAndPasswordPostgresql(inputName) {
    return new Promise((resolve) => {
      let bufName = "";
      let bufPassword = "";

      const client = new Client({
        user: "user", // DB のユーザー名を指定
        //host: 'database',
        host: process.env.DB_HOST,
        database: "mydb1",
        password: "pass", // DB のパスワードを指定
        //post: 5432,
        //ssl: { rejectUnauthorized: false }
      });

      console.log("process.env=" + JSON.stringify(process.env));
      console.log("process.env.DATABASE_URL=" + process.env.DATABASE_URL);

      client.connect();
      /*
      client.connect()
      .then(() => console.log("success!!"))
      .then(() => client.query("select * from chat order by timestamp desc"))
      .then(function (results) {
      console.table(results.rows)
        res.render('index', { result: results.rows })
      })
      */

      client.query("SELECT * FROM users", (err, res) => {
        if (err) {
          console.log(err);
          //throw err;
        } else {
          for (let row of res.rows) {
            console.log(JSON.stringify(row));
            bufName = row.name;
            bufPassword = row.password;
          }
        }

        client.end();

        resolve({ Name: bufName, Password: bufPassword });
      });
    });
  }
};
