const arp1 = require('arp-a');
const cfg = require('config');
const equal = require('deep-equal');
const fs = require('fs');
import { Utilities } from '../shared/utilities';
import _ = require('lodash');
import { random } from 'lodash';
import { ILeases } from "../interfaces/interfaces";

import TenantStore from '../stores/tenantStore';
const tenantStore = new TenantStore();

import DeviceStore from '../stores/deviceStore';
const deviceStore = new DeviceStore();

export default class LeasesServices {

    async NewLeasesReceiver(data: any){
        //Utilities.log('leasesServices received from ' + data.TenantId + ' leases: '+ this.GetLeasesFromRawData(data.leases))
        //console.log('leasesServices received from ' + data.TenantId + ' leases: '+ this.GetLeasesFromRawData(data.leases))
        if (tenantStore.TenantExists(data.TenantId) === 1){
            console.log('Ok Esiste');
            this.ExistsLeases( await this.GetLeasesFromRawData(data.leases))
        }else{
            console.log('NON Esiste!!!');
        }
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
    async ExistsLeases (leases: ILeases) {
        console.log( deviceStore.findByLeases(leases.ip,leases.mac) )
    }

}