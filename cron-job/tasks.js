const TASKS = [
  {
    name: 'PFK salah satker/akun',
    method: 'GET',
    url: 'DataPFK/pfk_salah_satker'
  },
  {
    name: 'PFK salah potong',
    method: 'GET',
    url: 'DataPFK/pfk_salah_potong'
  }, 
  {
    name: 'PFK salah jendok',
    method: 'GET',
    url: 'DataPFK/pfk_salah_jendok'
  }, 
  {
    name: 'PFK salah pecahan',
    method: 'GET',
    url: 'DataPFK/pfk_salah_pecahan'
  },
  {
    name: 'Suspen pengembalian belanja',
    method: 'GET',
    url: 'dataSPM/NmSatkerSuspend'
  }, 
  {
    name: 'Suspend penerimaan',
    method: 'POST',
    form: {
      'kdkppn': null,
      'koreksi': 'BELUM',
      'tgl_awal': null,
      'tgl_akhir': null,
      'submit_file': null
    },
    url: 'dataGR/SuspendSatkerPenerimaan'
  }, 
  {
    name: 'Suspend akun',
    method: 'POST',
    form: {
      'kdkppn': null,
      'koreksi': 'BELUM',
      'tgl_awal': null,
      'tgl_akhir': null,
      'submit_file': null
    },
    url: 'dataGR/SuspendAkunPenerimaan'
  },
  {
    name: 'Retur SP2D',
    method: 'POST',
    form: {
      'submit_file': null,
      'kdkppn': null,
      'nosp2d': null,
      'notransaksi': null,
      'kdsatker': null,
      'status': 'BELUM PROSES',
      'tgl_awal': null,
      'tgl_akhir': null,
      'tgl_setor_awal': null,
      'tgl_setor_akhir': null,
      'tgl_pengganti_awal': null,
      'tgl_pengganti_akhir': null
    },
    url: 'dataRetur/monitoringRetur2'
  },
  {
    name: 'Hold Invoice',
    method: 'POST',
    form: {
      'kdkppn': null,
      'invoice': null,
      'STATUS': 1,
      'submit_file': null
    },
    url: 'dataSPM/HoldSPM'
  }
];

module.exports = TASKS;