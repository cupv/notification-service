import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metric: tỷ lệ request fail (nên < 1%)
const errorRate = new Rate('errors');

export const options = {
    stages: [
        { duration: '30s', target: 50 },   // Ramp up đến 50 VUs trong 30s
        { duration: '1m', target: 50 },   // Giữ 50 VUs trong 1 phút (average load)
        { duration: '30s', target: 200 },  // Ramp up đến 200 VUs (stress test nhẹ)
        { duration: '1m', target: 200 },  // Giữ peak load
        { duration: '30s', target: 0 },    // Ramp down
    ],
    thresholds: {
        'http_req_duration': ['p(95)<500'],     // 95% request < 500ms
        'http_req_failed': ['rate<0.01'],     // <1% fail
        'errors': ['rate<0.01'],     // Custom error rate
        'checks': ['rate>0.99'],     // >99% check pass
    },
};

export default function () {
    const url = 'http://localhost:3000/api/v1/notifications';

    const payload = {
        title: "CuPV Test " + Date.now(),  // Unique title để dễ trace
        content: "Hello CuPV from k6 load test.",
        receiverId: 1,  // Hoặc randomize nếu test multi-user: Math.floor(Math.random() * 100) + 1
        redirectUrl: "http://localhost:3000/api/v1/notifications",
        platform: {
            name: "WEBHOOK",
            data: {
                destinationUrl: "http://localhost:3000/api/v1/notifications"  // hoặc mock URL nếu webhook chậm
            }
        }
    };

    const params = {
        headers: {
            'Content-Type': 'application/json',
            // Nếu API cần auth: 'Authorization': 'Bearer YOUR_TOKEN',
        },
    };

    const res = http.post(url, JSON.stringify(payload), params);

    // Check response
    const success = check(res, {
        'status is 201 or 200': (r) => r.status === 201 || r.status === 200,
    });

    // Track error
    errorRate.add(!success);

    // Log nếu fail (chỉ in console, không ảnh hưởng performance)
    if (!success) {
        console.log(`Request failed: ${res.status} - ${res.body}`);
    }

    // Think time giả lập user (random 0.5-2s)
    sleep(Math.random() * 1.5 + 0.5);
}