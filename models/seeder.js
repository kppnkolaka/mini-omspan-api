const Config = require('./configs');

const doSeeding = () => {
  return Config.set('seed');
}

module.exports = doSeeding;
// const rekonSeeder = async () => {
//   const data = [
//     {
//         "kategori": "PFK salah satker/akun",
//         "jumlah": 0,
//         "url": "https://spanint.kemenkeu.go.id/spanint/latest/app/#span/DataPFK/pfk_salah_satker"
//     },
//     {
//       "kategori": "PFK salah potong",
//       "jumlah": 0,
//       "url": "https://spanint.kemenkeu.go.id/spanint/latest/app/#span/DataPFK/pfk_salah_potong"
//     },
//     {
//       "kategori": "PFK salah jendok",
//       "jumlah": 0,
//       "url": "https://spanint.kemenkeu.go.id/spanint/latest/app/#span/DataPFK/pfk_salah_jendok"
//     },
//     {
//       "kategori": "PFK salah pecahan",
//       "jumlah": 0,
//       "url": "https://spanint.kemenkeu.go.id/spanint/latest/app/#span/DataPFK/pfk_salah_pecahan"
//     },
//     {
//         "kategori": "Suspen pengembalian belanja",
//         "jumlah": 0,
//         "url": "https://spanint.kemenkeu.go.id/spanint/latest/app/#span/dataSPM/NmSatkerSuspend"
//     },
//     {
//       "kategori": "Suspend penerimaan",
//       "jumlah": 0,
//       "url": "https://spanint.kemenkeu.go.id/spanint/latest/app/#span/dataGR/SuspendSatkerPenerimaan"
//     },
//     {
//       "kategori": "Suspend akun",
//       "jumlah": 0,
//       "url": "https://spanint.kemenkeu.go.id/spanint/latest/app/#span/dataGR/SuspendAkunPenerimaan"
//     },
//     {
//         "kategori": "Retur SP2D",
//         "jumlah": 0,
//         "url": "https://spanint.kemenkeu.go.id/spanint/latest/app/#span/dataRetur/monitoringRetur2"
//     },
//     {
//         "kategori": "Hold Invoice",
//         "jumlah": 0,
//         "url": "https://spanint.kemenkeu.go.id/spanint/latest/app/#span/dataSPM/HoldSPM"
//     }
//   ];

//   try {
//     await Rekon.insertMany(data);
//   } catch (error) {
//     return false;
//   }
  
//   return true;
// }

// const doSeeding = () => {
//   const rekon = rekonSeeder();

//   if(rekon) {
//     return 'seeding success';
//   }
// }