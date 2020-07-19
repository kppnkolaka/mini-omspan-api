const Request = require('../utils/http-request');
const authenticate = require('../../services/authenticate');
const { getPaguMinus, omspanClient } = require('../../api');
const asyncLimit = require('../utils/async-limit');
const PaguMinus = require('../../models/pagu-minus');

function PaguMinusJob() {
  const AUTH_LIMIT = 3;
  const KELAKUN_LIMIT = 1;
  const PERAKUN_LIMIT = 1;

  const authLimiter = () => {
    return asyncLimit(authenticate, AUTH_LIMIT, 'AUTH');
  }

  this.paguMinus = [];

  this.getPaguMinus = async () => {
    let token = '';

    try {
      const auth = await authLimiter()(null);
      token = auth.data.token;
    } catch (error) {
      console.log('failed authentication...', 'satker');
    }

    let daftarSatker = [];

    try {
      daftarSatker = await Request.paguMinus(token, getPaguMinus.satker);
    } catch (error) {
      console.log('error', 'satker');
    }

    const kelakunLimiter = asyncLimit(daftarKelakun, KELAKUN_LIMIT, 'KELAKUN');

    let paguMinusPromise = [];

    for(const element of daftarSatker) {
      let kodeSatker = element[1].value.split('/')[3];
      let namaSatker = element[2].value;

      const kelakun = await kelakunLimiter(kodeSatker, namaSatker);
      paguMinusPromise.push(kelakun);
    }

    return Promise.all(paguMinusPromise).then( res => {
      console.log(res, 'RRRRRR');
      return this.paguMinus;
    }).catch( () => {
      console.log('ERROR PROMISE ALL');
    });
  }

  this.storePaguMinus = async () => {

  }

  // Fetch semua parameter kelompok akun
  const daftarKelakun = async (kdsatker, namaSatker) => {
    let token = '';

    try {
      const auth = await authLimiter()(null);
      token = auth.data.token;
    } catch (error) {
      console.log('failed authentication...', 'kelakun');
    }

    let dataKelakun = [];
    try {
      dataKelakun = await Request.paguMinus(token, getPaguMinus.kelakun({ satker: kdsatker, kppn: '156' }))
    } catch (error) {
      console.log('error', 'kelakun');
    }

    const perakunLimiter = asyncLimit(dataIsPaguMinus, PERAKUN_LIMIT, 'PERAKUN');

    let paguminusPerakun = [];

    // Async limit required
    for(const element of dataKelakun) {
      let omspan_client_url = '';
      let urlParam = {};

      if(element.length > 1) {
        omspan_client_url = omspanClient + element[3].value.split('"')[1];

        param = element[3].value.split('/');
            
        urlParam['satker'] = param[3];
        urlParam['program'] = param[4];
        urlParam['output'] = param[5];
        urlParam['akun'] = param[6];
        urlParam['dana'] = param[7];

        const perakun = await perakunLimiter(urlParam, omspan_client_url, namaSatker);
        paguminusPerakun.push(...perakun);
      }
    }

    return paguminusPerakun;
  }

  // Fetch semua data pagu per akun
  const dataIsPaguMinus = async (urlParam, omspan_client_url, namaSatker) => {
    let token = '';
    try {
      const auth = await authLimiter()(null);
      token = auth.data.token;
    } catch (error) {
      console.log('failed authentication...');
    }

    let dataPerAkun = [];
    try {
      dataPerAkun = await Request.paguMinus(token, getPaguMinus.akun(urlParam));
    } catch (error) {
      console.log('error', 'perakun');
    }

    let paguminus = [];

    dataPerAkun.forEach(element => {
      const sisaPagu = parseInt(element[13].value.split(',').join(''));

      if(sisaPagu < 0) {
        console.log('satker ' + element[1].value + ' ; akun ' + element[3].value + ' ; sisa pagu ' + sisaPagu + ' ; url ' + omspan_client_url);

        const response = {
          satker: element[1].value,
          nama_satker: namaSatker,
          akun: element[3].value,
          sisa_pagu: sisaPagu,
          url: omspan_client_url
        };

        PaguMinus.set(response);

        paguminus.push(response);
      }
    });

    return paguminus;
  }
}

module.exports = new PaguMinusJob;