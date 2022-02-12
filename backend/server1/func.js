global.fetch = require("node-fetch");

//https://documenter.getpostman.com/view/9215231/SzYaWe6h?version=latest

//async function api() {
const getCovid19Area = async () => {
  /*
  let options = {
    method : 'GET',
    headers : {必要な情報をここにつめる},
    query : {必要な情報をここにつめる},
    body : {必要な情報をここにつめる}
  }
  */

  //https://documenter.getpostman.com/view/9215231/SzYaWe6h?version=latest

  let url = "https://covid19-japan-web-api.now.sh/api//v1/prefectures";
  let options = {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };

  var res = await fetch(url, options);
  var status = await res.status;
  var responseBody = await res.json();

  return responseBody;
};

const getCovid19Total = async () => {
  let url = "https://covid19-japan-web-api.now.sh/api//v1/total";
  let options = {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };

  var res = await fetch(url, options);
  var status = await res.status;
  var responseBody = await res.json();

  return responseBody;
};

const getCovid19Positives = async () => {
  let url = "https://covid19-japan-web-api.now.sh/api//v1/positives";
  let options = {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };

  var res = await fetch(url, options);
  var status = await res.status;
  var responseBody = await res.json();

  return responseBody;
};

//module.exports = {getCovid19Area, schema};
module.exports = { getCovid19Area, getCovid19Total, getCovid19Positives };
