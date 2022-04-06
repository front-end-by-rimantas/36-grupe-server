const handler = {};

handler.account = (data) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        console.log('Account: veiksmas leistinas');
    } else {
        console.log('Account: veiksmas NEleistinas');
    }
}

export default handler;