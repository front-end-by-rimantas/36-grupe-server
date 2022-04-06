const handler = {};

handler.token = (data) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        console.log('Token: veiksmas leistinas');
    } else {
        console.log('Token: veiksmas NEleistinas');
    }
}

export default handler;