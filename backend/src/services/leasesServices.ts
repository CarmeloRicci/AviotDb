const arp1 = require('arp-a');
const cfg = require('config');
const equal = require('deep-equal');
const fs = require('fs');
import { Utilities } from '../shared/utilities';
import _ = require('lodash');
import { random } from 'lodash';
import { ILeases, IDevice } from "../interfaces/interfaces";

import TenantStore from '../stores/tenantStore';
const tenantStore = new TenantStore();

import DeviceStore from '../stores/deviceStore';
const deviceStore = new DeviceStore();

export default class LeasesServices {

    async NewLeasesReceiver(data: any) {
        //Utilities.log('leasesServices received from ' + data.TenantId + ' leases: '+ this.GetLeasesFromRawData(data.leases))
        //console.log('leasesServices received from ' + data.TenantId + ' leases: '+ this.GetLeasesFromRawData(data.leases))

        if (await tenantStore.TenantExists(data.TenantId) === 1) {
            //console.log('Ok Esiste il tenent');
            let leases: ILeases[] = await this.RawDataToArrayLeases(data.leases)

            for (let i = 0; i < leases.length; i++) {
                if ( await this.ExistsDevices(leases[i]) == 0 ){
                        console.log ("elemento " + i + " non esiste")
                        await this.InsertDevice(leases[i],data.TenantId)
                        console.log("Elemento inserito")
                    }else{
                        console.log ("elemento " + i + " esiste")
                        //console.log ( await deviceStore.findByMac(leases[i].mac) )

                    }

                }

        } else {
            //console.log('NON Esiste il tenent!!!');
            //Utilities.log('leasesRoutes error ' + data.TenantId + ' leases: ' + this.GetLeasesFromRawData(data.leases) );

        }
    }

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

    async InsertDevice(leases: ILeases, TenandId: any) {
        let temp: IDevice
        temp={Device_id: 0, Tenant_id: TenandId, Nome: leases.host, Ip: leases.ip, Mac: leases.mac}
        await deviceStore.create(temp)
    }

    async CheckIpDevices(leases: ILeases, TenandId: any) {

        let temp: IDevice
        temp = await deviceStore.findByMacAndIp(leases.mac, leases.ip)

console.log("->>>>" + temp)
        // temp={Device_id: 0, Tenant_id: TenandId, Nome: leases.host, Ip: leases.ip, Mac: leases.mac}
        // await deviceStore.create(temp)
    }




}