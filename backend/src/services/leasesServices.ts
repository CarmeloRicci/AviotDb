const arp1 = require('arp-a');
const cfg = require('config');
const equal = require('deep-equal');
const fs = require('fs');
import { Utilities } from '../shared/utilities';
import _ = require('lodash');
import { ILeases } from "../interfaces/interfaces";

import TenantStore from '../stores/tenantStore';
import { random } from 'lodash';
const tenantStore = new TenantStore();

export default class LeasesServices {

    async NewLeasesReceiver(data: any){
        //Utilities.log('leasesServices received from ' + data.TenantId + ' leases: '+ this.GetLeasesFromRawData(data.leases))
        //console.log('leasesServices received from ' + data.TenantId + ' leases: '+ this.GetLeasesFromRawData(data.leases))
        if (tenantStore.TenantExists(data.TenantId) === 1){
            console.log('Ok Esiste');
        }else{
            console.log('NON Esiste!!!');
        }
        
        const deviceResponse = await tenantStore.findById(data.TenantId);
        console.log(deviceResponse)

    }


    async GetLeasesFromRawData (raw: any) {
        let temp:ILeases;
        temp.timestamp = raw.timestamp;
        temp.mac = raw.mac;
        temp.ip = raw.ip;
        temp.host = raw.host;
        temp.id = raw.id;
        return temp
    }
}