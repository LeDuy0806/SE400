import  http from 'k6/http';
import {check, sleep}  from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options ={
    vus : 100,
    duration: '10s',
    thresholds:{
        http_req_duration: ['p(95)<500'],
    },
}

export default function (){
    const BASE_URL = `${__ENV.FRONTEND_ADDRESS}`;
    let res = http.get(BASE_URL);
    check(res, {'homepage status is 200': (r)=> r.status === 200});
    sleep(1)
}


export function handleSummary(data) {
    return {
        "/performance_testing_script/summary.html": htmlReport(data),
    };
}
