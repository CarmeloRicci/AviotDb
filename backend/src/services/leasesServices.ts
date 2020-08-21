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

    async NewLeasesReceiver(data: any) {
        //Utilities.log('leasesServices received from ' + data.TenantId + ' leases: '+ this.GetLeasesFromRawData(data.leases))
        //console.log('leasesServices received from ' + data.TenantId + ' leases: '+ this.GetLeasesFromRawData(data.leases))

        if (tenantStore.TenantExists(data.TenantId) === 1) {
            //console.log('Ok Esiste il tenent');
            let leases: ILeases[] = await this.RawDataToArrayLeases(data.leases)

            for (let i = 0; i < leases.length; i++) {
                if ( await this.ExistsDevices(leases[i]) === 0 ){
                        console.log ("elemento " + i + " non esiste")
                    }else{
                        console.log ("elemento " + i + " esiste")
                    }

                }

        } else {
            //console.log('NON Esiste il tenent!!!');
            //Utilities.log('leasesRoutes error ' + data.TenantId + ' leases: ' + this.GetLeasesFromRawData(data.leases) );

        }
    }


    // async GetLeasesFromArray (raw: any) {
    //     let temp:ILeases
    //      temp = { timestamp: raw.timestamp, mac: raw.mac, ip: raw.ip, host: raw.host, id:raw.id };
    //     return temp
    // }
    async RawDataToArrayLeases(raw: any) {
        let temp: ILeases[] = raw
        return temp
    }

    async ExistsDevices(leases: ILeases) {

        if (await deviceStore.findByMac(leases.mac)) {
            return await deviceStore.findByMac(leases.mac)
        } else {
            return 0
        }
    }

}