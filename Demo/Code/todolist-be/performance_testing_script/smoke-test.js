import  http from 'k6/http';
import {check, sleep}  from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options ={
    vus : 10,
    duration: '10s',
    thresholds:{
        http_req_duration: ['p(95)<500'],
    },
}

export default function (){
    const BASE_URL = `${__ENV.BACKEND_ADDRESS}`;
    
    let res = http.get(BASE_URL+"/ping");
    check(res, {'ping status is 200': (r)=> r.status === 200});

    res = http.get(BASE_URL+"/api/items");
    check(res, {'get list todo items status is 200': (r)=> r.status === 200});
    
    sleep(0.5)
}


export function handleSummary(data) {
    return {
        "/performance_testing_script/summary.html": htmlReport(data),
    };
}
