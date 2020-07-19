exports.omspan = 'https://spanint.kemenkeu.go.id/spanint/data/';

exports.omspanClient = 'https://spanint.kemenkeu.go.id/spanint/latest/app/#span/';

exports.getJwtToken = 'https://spanint.kemenkeu.go.id/spanint/data/auth/requestJWTToken';

exports.getPaguMinus = {
  satker: 'https://spanint.kemenkeu.go.id/spanint/data/dataDIPA/nmsatker1',
  kelakun: data => {
    return 'https://spanint.kemenkeu.go.id/spanint/data/dataDIPA/RealisasiFA_1/' + data.satker + '/' 
      + data.kppn;
  },
  akun: data => {
    return 'https://spanint.kemenkeu.go.id/spanint/data/dataDIPA/RealisasiFA/' + data.satker + '/'
      + data.program + '/' + data.output + '/' + data.akun + '/' + data.dana;
  }
};