const aside = [
  {
    url: 'Home',
    resourceIco: 'icon-shouye',
    name: 'Home',
    show: true
  },
  {
    url: 'PartEnquiry',
    resourceIco: 'icon-engine',
    name: 'Part Enquiry',
    show: true
  },
  {
    resourceIco: 'icon-jifen',
    name: 'Master Data',
    show: true,
    children: [
      {
        url: 'supersessionRelationship',

        name: 'Supersession Relationship',
        show: true
      },
      {
        url: 'HSCode',

        name: 'UAE HS Code',
        show: true
      },
      {
        url: 'customerManagement',

        name: 'Customer Management',
        show: true
      },
      {
        url: 'calendar',

        name: 'Calendar',
        show: true
      },
      {
        url: 'vendorManagement',

        name: 'Vendor Management',
        show: true
      },
    ]
  },
  {
    resourceIco: 'icon-engine',
    name: 'Part Management',
    show: true,
    children: [
      {
        url: 'productGroup',
        name: 'Product Group',
        show: true
      },
      {
        url: 'partData',
        name: 'Part Data',
        show: true
      },
    ]
  },
  {
    resourceIco: 'icon-Price',
    name: 'Price Management',
    show: true,
    children: [
      {

        name: 'Purchase Price Management',
        show: true,
        children: [
          {
            url: 'purchasePriceMaintenance',
            name: 'Purchase Price Maintenance',
            show: true
          },
        ]
      },
      {

        name: 'Sales Price Management',
        show: true,
        children: [
          {
            url: 'salesPriceMaintenance',
            name: 'Sales Price Maintenance !',
            show: true
          },
          {
            url: 'salesMarginMaintenance',
            name: 'Sales Margin Maintenance !',
            show: true
          },
          {
            url: 'salesDiscountMaintenance',
            name: 'Sales Discount Maintenance',
            show: true
          },
          {
            url: 'salesPriceByOrderType',
            name: 'Sales Price By Order Type',
            show: true
          },
        ]
      },
    ]
  },
  {
    resourceIco: 'icon-Invoice',
    name: 'Invoice Management',
    show: true,
    children: [
      {
        url: 'commercialInvoiceEnquiry',
        name: 'Commercial Invoice Enquiry',
        show: true
      },
      {
        url: 'ProformaInvoiceEnquiry',
        name: 'Proforma Invoice Enquiry',
        show: true
      },
      {
        url: 'purchaseCIEnquiry',
        name: 'Purchase CI Enquiry',
        show: true
      },
      {
        url: 'salesCIManagement',
        name: 'Sales CI Management',
        show: true
      },
    ]
  },
  {
    resourceIco: 'icon-Dollar',
    name: 'Payment Management',
    show: true,
    children: [
      {
        url: 'paymentAdvice',
        name: 'Payment Advice',
        show: true
      },
      {
        url: 'paymentInformation',
        name: 'Payment Information',
        show: true
      },
      {
        url: 'paymentConfirm',
        name: 'Payment Confirm',
        show: true
      },
      {
        url: 'advancedPayment',
        name: 'Advanced Payment',
        show: true
      }
    ]
  },
  {
    resourceIco: 'icon-creditcard',
    name: 'Credit Management',
    show: true,
    children: [
      {
        url: 'creditEnquiry',
        name: 'Credit Enquiry',
        show: true
      },
      {
        url: 'balanceDiscrepancy',
        name: 'Credit Balance Discrepancy',
        show: true
      }
    ]
  },
  {
    resourceIco: 'icon-xiaojisuanqi',
    name: 'Settlement Management',
    show: true,
    children: [
      {
        url: 'purchaseSettlement',
        name: 'Purchase Settlement',
        show: true
      },
      {
        url: 'salesSettlement',
        name: 'Sales Settlement',
        show: true
      }
    ]
  },
  {
    resourceIco: 'icon-yunshuzhongwuliu',
    name: 'Logistics Management',
    show: true,
    children: [
      {
        url: 'leadTimeManagement',
        name: 'Lead Time Maintenance',
        show: true
      },
      {
        url: 'deliveryAdvice',
        name: 'Delivery Advice',
        show: true
      },
      {
        url: 'partTracking',
        name: 'Part Tracking',
        show: true
      },
      {
        url: 'advancedShippingNote',
        name: 'Advanced Shipping Note',
        show: true
      },
      {
        url: 'inboundTracking',
        name: 'Inbound Tracking',
        show: true
      },
      {
        url: 'deliveryNote',
        name: 'Delivery Note',
        show: true
      },
      {
        url: 'outboundTracking',
        name: 'Outbound Tracking',
        show: true
      },
    ]
  },
  {
    resourceIco: 'icon-cangkucangchu',
    name: 'Warehouse Management',
    show: true,
    children: [
      {
        url: 'GNCMaintenance',
        name: 'G.N.C Maintenance',
        show: true
      },
      {
        url: 'GNCDiscrepancy',
        name: 'G.N.C Discrepancy',
        show: true
      },
      {
        url: 'SSDiscrepancy',
        name: 'S/S Discrepancy',
        show: true
      },
      {
        url: 'GRDiscrepancy',
        name: 'GR Discrepancy',
        show: true
      },
      {
        url: 'GIDiscrepancy',
        name: 'GI Discrepancy',
        show: true
      },
      {
        url: 'inventoryEnquiry',
        name: 'Inventory Enquiry',
        show: true
      },
    ]
  },
  {
    resourceIco: 'icon-caigou',
    name: 'Purchase Management',
    show: true,
    children: [
      {
        url: 'purchaseOrderCreation',
        name: 'Purchase Order Creation',
        show: true
      },
      {
        url: 'purchaseOrderApprove',
        name: 'Purchase Order Approve',
        show: true
      },
      {
        url: 'purchaseItemTracking',
        name: 'Purchase Item Tracking',
        show: true
      },
      {
        url: 'purchaseOrderEnquiry',
        name: 'Purchase Order Enquiry',
        show: true
      },
    ]
  },
  {
    resourceIco: 'icon-caigou',
    name: 'Purchase Management(Customer)',
    show: true,
    children: [
      {
        url: 'cstmTracking',
        name: 'Purchase Item Tracking(Customer)',
        show: true
      },
      {
        url: 'cstmEnquiry',
        name: 'Purchase Order Enquiry(Customer)',
        show: true
      },
      {
        url: 'cstPurchaseOrderCreation',
        name: 'Purchase Order Creation(Customer)',
        show: true
      },
    ]
  },
  {
    resourceIco: 'icon-sale',
    name: 'Sales Management',
    show: true,
    children: [
      {
        url: 'salesOrderApprove',
        name: 'Sales Order Approve',
        show: true
      },
      {
        url: 'salesOrderEnquiry',
        name: 'Sales Order Enquiry',
        show: true
      },
      {
        url: 'salesItemEnquiry',
        name: 'Sales Item Enquiry',
        show: true
      },
      {
        url: 'salesBOTracking',
        name: 'Sales B/O Tracking',
        show: true
      },
    ]
  },
  {
    resourceIco: 'icon-control',
    name: 'ICC Management',
    show: true,
    children: [
      {
        url: 'ICCSalesAllocation',
        name: 'Sales Allocation Maintenance',
        show: true
      },
      {
        url: 'ICCValueClassEnquiry',
        name: 'ICC-Value Class Enquiry',
        show: true
      },
      {
        url: 'ICCMovementClass',
        name: 'ICC-Movement Class Maintenance',
        show: true
      },
    ]
  },
]
export default aside