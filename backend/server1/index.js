//参考URL
//https://qiita.com/sa9ra4ma/items/67edf18067eb64a0bf40

//1
// expressモジュールを読み込む
const express = require("express");
const jwt = require("jsonwebtoken");
var config = require("./config");
const dbAcc = require("./dbAccess.js");
const hash = require("./hashCreator");
const func = require("./func.js");

const PORT = 3001;

// expressアプリを生成する
const app = express();

//express.json()とは
//Body-Parserを基にExpressに組み込まれた機能です、クライアントから送信されたデータを、req.body経由で会得、操作できます。
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2鍵
//const SECRET_KEY = "abcdefg";
const SECRET_KEY = config.secret;

//APIサービスを構築する際に、Postmanなどのツールでは正常にアクセスできますが、
//ブラウザからアクセスすると、エラーになる場合があります。
//それはCORS(Cross-Origin Resource Sharing)対応をしていない可能性があります。
//なぜなら、サイトのドメインとAPIサービスのドメインが違う場合は
//先にoptionsメソッドで問い合わせをします。許可する場合のみ実際のAPIを通信します。
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, access_token"
  );

  console.log("allowCrossDomain=" + req.method);
  // intercept OPTIONS method
  if ("OPTIONS" === req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);

//3JWT発行API
app.post("/login", async (req, res) => {
  //name:ikegaya
  //password:password1
  const objHash = new hash(req.body.password);
  bufHash = objHash.hashCreate();
  //console.log('bufHash=' + bufHash);

  let reqName = req.body.name;
  let reqPassword = bufHash;

  const dbInstance = new dbAcc();
  //let result = await dbInstance.asyncPromiseLoginChk(reqName);
  let result = await dbInstance.asyncPromiseLoginChkPostgresql(reqName);
  //console.log('result=' + result);
  console.log("result.Name=" + result.Name);
  console.log("result.Password=" + result.Password);
  let bufName = result.Name;
  let bufPassword = result.Password;

  // validation
  if (reqName != bufName) {
    res.json({
      success: false,
      message: "User not found.",
      token: null,
    });
    return;
  }
  if (reqPassword != bufPassword) {
    res.json({
      success: false,
      message: "Password is wrong.",
      token: null,
    });
    return;
  }

  // 動作確認用に全ユーザーログインOK
  const payload = {
    user: req.body.user,
    //user: 'ikegaya'
  };
  const option = {
    //expiresIn: '1m'
    expiresIn: "24h",
  };

  const token = jwt.sign(payload, SECRET_KEY, option);
  res.json({
    success: true,
    message: "create token",
    token: token,
  });
});

//4認証用ミドルウェア
const auth = (req, res, next) => {
  // リクエストヘッダーからトークンの取得
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    //return next('token none');
    next("token none");
  }
  //console.log('token=', token);

  // トークンの検証
  jwt.verify(token, SECRET_KEY, function (err, decoded) {
    if (err) {
      // 認証NGの場合
      //next(err.message);
      req.decoded = "err";
      req.token = "";
      next();
    } else {
      // 認証OKの場合
      req.decoded = decoded;
      req.token = token;
      next();
    }
  });
};

//5認証必須API
app.get("/auth", auth, (req, res) => {
  //console.log('token=', token);
  console.log("req.decoded=", req.decoded);

  if (req.decoded === "err") {
    res.json({
      success: false,
      message: "No Authenticate",
      token: "",
    });
  } else {
    res.json({
      success: true,
      message: "Ok Authenticate",
      token: req.token,
    });
  }
});

//covid19都道府県取得
app.get("/covid19Area", auth, async (req, res) => {
  console.log("ServerCovid19Area");
  let retValue = null;
  await func.getCovid19Area().then((result) => {
    retValue = result;
  });

  // 関数化する
  if (req.decoded === "err") {
    res.json({
      success: false,
      message: "No Authenticate",
      token: "",
      data: "",
    });
  } else {
    res.json({
      success: true,
      message: "Ok Authenticate",
      token: req.token,
      data: retValue,
    });
  }
});

//covid19トータルデータ取得
app.get("/covid19Total", auth, async (req, res) => {
  console.log("ServerCovid19Total");
  let retValue = null;
  await func.getCovid19Total().then((result) => {
    retValue = result;
  });

  // 関数化する
  if (req.decoded === "err") {
    res.json({
      success: false,
      message: "No Authenticate",
      token: "",
      data: "",
    });
  } else {
    res.json({
      success: true,
      message: "Ok Authenticate",
      token: req.token,
      data: retValue,
    });
  }
});

//covid19陽性者データ取得
app.get("/covid19Positives", auth, async (req, res) => {
  console.log("ServerCovid19Positives ");
  let retValue = null;
  await func.getCovid19Positives().then((result) => {
    retValue = result;
  });

  // 関数化する
  if (req.decoded === "err") {
    res.json({
      success: false,
      message: "No Authenticate",
      token: "",
      data: "",
    });
  } else {
    res.json({
      success: true,
      message: "Ok Authenticate",
      token: req.token,
      data: retValue,
    });
  }
});

//6エラーハンドリング
app.use((err, req, res, next) => {
  console.log(err);
  res.send(500, err);
});

// ルート（http://localhost/）にアクセスしてきたときに「Hello」を返す
app.get("/", (req, res) => res.send("Hello test"));

// ポート3000でサーバを立てる
//app.listen(3000, () => console.log('Listening on port 3000'));
//Heroku へデプロイした際は、ポートは process.env.PORT が適用される
app.listen(process.env.PORT || PORT, () =>
  console.log("Listening on port 3001")
);
