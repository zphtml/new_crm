/**
 * Created by wang on 2017/5/27.
 */
import { fetch } from '@/utils/fetch';

export function getOther(id) {
  return fetch({
    url: '/landpage/other',
    method: 'get',
    params: { id }
  });
}
