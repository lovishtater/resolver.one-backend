function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    "Access-Control-Max-Age": 2592000, // 30 days
}

function throwError  (res , err) {
    res.writeHead(400, headers);
    res.write(JSON.stringify({ error: err.message }));
    res.end();
 }


module.exports = {
    getPostData,
    throwError,
    headers
}