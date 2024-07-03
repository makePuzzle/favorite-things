export function fetchJSONData(url, callback) {
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            };
            return res.json();
        })
        .then(data => {
            resolve(callback(data));
        })
        .catch(error => {
            console.error('Unable to fetch data:',error)
            reject(error);
        });
    });
};