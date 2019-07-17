/**
 * Created by wang on 2017/5/27.
 */
import { fetch } from '@/utils/fetch';

export function getType(id) {
  return fetch({
    url: '/sem/gettype',
    method: 'get',
    params: { id }
  });
}

export function getAgentList() {
    return fetch({
        url: 'agent_company_list',
        method: 'get'
    })
}

export function addAgent(data) {

    return fetch({
        url: '/agent_company_addru',
        method: 'post',
        data: data
    })
}


export function getInvoiceList() {

    return fetch({
        url: 'piaotype_list',
        method: 'get'
    })
}

export function addInvoice(data) {
    return fetch({
        url: 'piaotype_addru',
        method: 'post',
        data: data
    })
}
