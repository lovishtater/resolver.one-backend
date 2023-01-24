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

function throwError  (res , err) {
    res.writeHead(400, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ error: err }));
 }
module.exports = {
    getPostData,
    throwError
}