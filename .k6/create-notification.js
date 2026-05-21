import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';


const errorRate = new Rate('errors');

export const options = {
    stages: [
        { duration: '30s', target: 50 },  
        { duration: '1m', target: 50 },  
        { duration: '30s', target: 200 },  
        { duration: '1m', target: 200 }, 
        { duration: '30s', target: 0 },    
    ],
    thresholds: {
        'http_req_duration': ['p(95)<500'],     
        'http_req_failed': ['rate<0.01'],    
        'errors': ['rate<0.01'],    
        'checks': ['rate>0.99'],    
    },
};

export default function () {
    const url = 'http://localhost:3000/api/v1/notifications';

    const payload = {
        title: "CuPV Test " + Date.now(),  
        content: "Hello CuPV from k6 load test.",
        receiverId: 1,  
        redirectUrl: "http://localhost:3000/api/v1/notifications",
        platform: {
            name: "WEBHOOK",
            data: {
                destinationUrl: "http://localhost:3000/api/v1/notifications" 
            }
        }
    };

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, JSON.stringify(payload), params);

    const success = check(res, {
        'status is 201 or 200': (r) => r.status === 201 || r.status === 200,
    });

    errorRate.add(!success);

    if (!success) {
        console.log(`Request failed: ${res.status} - ${res.body}`);
    }

    sleep(Math.random() * 1.5 + 0.5);
}
