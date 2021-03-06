import axios from 'axios'
import { environments } from '../../environments/index.ts'
import { LocalStorageUtils } from '../storage'

const uuidv1 = require('uuid/v1')

export class StatisticUtils {
    static init () {
        if (!LocalStorageUtils.read('shawn_uuid')) {
            LocalStorageUtils.write('shawn_uuid', uuidv1())
        }
    }

    static trackEvent (projectName: string, category: string, action: string, memo: string) {
        axios.post(`${environments.apiBaseURL}statistic/trackEvent`, { projectName, category, action, memo })
    }

    static trackPV (projectName: string, path: string, memo: string) {
        axios.post(`${environments.apiBaseURL}statistic/trackPV`, {
            projectName,
            uuid: LocalStorageUtils.read('shawn_uuid'),
            path,
            memo
        })
    }
}
