const handler = {};

handler.account = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return callback(200, {
            status: 'OK',
            msg: 'Account: veiksmas leistinas',
            time: Date.now(),
        });
    } else {
        return callback(400, 'Account: veiksmas NEleistinas');
    }
}

export default handler;