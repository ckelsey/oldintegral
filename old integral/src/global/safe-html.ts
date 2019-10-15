const SafeHtml = (string:string):string => {
    const map:GenericObject = {
        '<': 'lt',
        '>': 'gt',
        '"': 'quot',
        '\'': 'apos',
        '&': 'amp',
        '\r': '#10',
        '\n': '#13'
    };

    return string.toString().replace(/[<>"'\r\n&]/g, function (chr) {
        return '&' + map[chr] + ';'
    })
}

export default SafeHtml