const XeroClient = require('xero-node').AccountingAPIClient;

export default class XeroConnection {
    constructor(xeroConfig) {
        this.client = new XeroClient(xeroConfig);
    }
}