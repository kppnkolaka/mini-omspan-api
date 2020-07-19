const axios = require('axios');
const querystring  = require('querystring');
const { omspan, omspanClient } = require('../../api');

function Request() {
  this.rekon = (jwtToken, requestData) => {
    return axios({
      method: requestData.method,
      url: omspan + requestData.url,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      data: querystring.stringify(requestData.form)
    }).then( res => {
      let dataRekon = {
        kategori: requestData.name,
        jumlah: countResponseBody(res.data.data.body),
        url: omspanClient + requestData.url
      }

      // queryUpdateRekon(dataRekon);

      return dataRekon;
    }).catch( err => {
      console.log(err);
    });
  }

  this.paguMinus = (jwtToken, url) => {
    return axios({
      method: 'get',
      url,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      }
    }).then(res => {
      return res.data.data.body;
    });
  }
}

module.exports = new Request;

const countResponseBody = data => {
  if(data[0].length > 1) {
    return data.length;
  }

  return 0;
}

// const queryUpdateRekon = async data => {
//   try {
//     await Rekon.updateOne({ kategori: data.name }, { jumlah: data.result });
//   } catch (error) {
//     console.log('datetime - ' + data.name + ' - ' + data.result + ' - ERROR');
//   }
//   console.log('datetime - ' + data.name + ' - ' + data.result + ' - SUCCESS');
// }