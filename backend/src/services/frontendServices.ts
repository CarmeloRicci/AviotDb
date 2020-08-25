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
import { raw } from 'express';
const deviceStore = new DeviceStore();

export default class FrontendServices {

    async GetAllElements(){
        let rowdata = await deviceStore.getAllElements();
        await this.SendPostAllElements(rowdata);
    }

    async SendPostAllElements(data: any) {
        let request_data = {
            url: `http://${cfg.general.ipFrontend}:5000/frontend/allelements`,
            method: 'POST',
            body: {
                params: {
                    elements: data
                }
            },
            json: true
        };
        await Utilities.request(request_data);
        console.log("DnsService - SendPostResponse: Post send! " + `(http://${cfg.general.ipFrontend}:5000/frontend/allelements)`)
    }

}