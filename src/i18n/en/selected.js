const selected = {
  cargeType : [
      {
          name: 'Dangerous',
          value: 'Dangerous',
      },
      {
          name: 'Non-Dangerous',
          value: 'Non-Dangerous',
      }
  ],
  purchaseOrderType : [
      {
          name : 'Normal',
          value : 'Normal'
      },
      {
          name : 'VOR',
          value : 'VOR'
      },
      {
          name : 'Forward',
          value : 'Forward'
      },
  ],
  vendorType : [
      {
          name : 'Local',
          value : true,
      },
      {
          name : 'SMIL',
          value : false,
      }
  ],
  customerType : [
    {
      name : 'Dealer',
      value : 'Dealer',
    },
    {
      name : 'Distributor',
      value : 'Distributor',
    },
    {
      name : 'Warehouse',
      value : 'Warehouse',
    }
  ],
  priority: [
    {
      name : 1,
      value : 1,
    },
    {
      name : 2,
      value : 2,
    },
    {
      name : 3,
      value : 3,
    },
    {
      name : 4,
      value : 4,
    },
    {
      name : 5,
      value : 5,
    },
    {
      name : 6,
      value : 6,
    },
    {
      name : 7,
      value : 7,
    },
    {
      name : 8,
      value : 8,
    },
    {
      name : 9,
      value : 9,
    },
    {
      name : 10,
      value : 10,
    }
  ],
  source:[
    {
      name : 'SMIL',
      value : 1
    },
    {
      name : 'Local',
      value : 2
    }
  ],
  error:[
    {
      name : 'Error',
      value : '0'
    },
    {
      name : 'Normal',
      value : 1
    },
    {
      name : 'All',
      value : ' '
    }
  ],
  yesNo: [
    {
      name : 'Y',
      value : 1
    },
    {
      name : 'N',
      value : '0'
    },
  ],
  interchangability: [
    {
      name : 'Y',
      value : 1
    },
    {
      name : 'N',
      value : 0
    },
  ],
  lrCode: [
    {
      name:'L',
      value:'L'
    },
    {
      name:'R',
      value:'R'
    },
    {
      name:'N/A',
      value:'N/A'
    },
  ],
  IMVenderName: [
    {
      name: 'SMIL',
      value: 'SMIL',
    }
  ],
  paymentState: [
    {
      name: 'submitted',
      value: 1,
    },
    {
      name: 'received',
      value: 2,
    },
    {
      name: 'rejected',
      value: 3,
    }
  ],
  chooseData: [
    {
      name: 'CI Date',
      value: 1,
    },
    {
      name: 'SAP Account Date',
      value: 2,
    },
  ],
  DNData: [
    {
      name: 'DN Date',
      value: 0
    },
    {
      name: 'PKL Date',
      value: 1
    },
    {
      name: 'GI Date',
      value: 2
    },
  ],
  CIData: [
    {
      name: 'CI Date',
      value: 0
    },
    {
      name: 'GR Date(A)',
      value: 1
    },
  ]
}

export default selected
