const arp1 = require('arp-a');
const cfg = require('config');
const equal = require('deep-equal');
const fs = require('fs');
import { Utilities } from '../shared/utilities';
import _ = require('lodash');
import { FormatLeases } from "../interfaces/interfaces";

import TenantStore from '../stores/tenantStore';
const tenantStore = new TenantStore();

export default class LeasesServices {

    async NewLeasesReceiver(data: any){
        console.log('leasesServices received from ' + data.TenantId + ' leases: ' + data.leases)
        let exists = tenantStore.findById(data.TenantId)
        console.log(exists)
    }
}