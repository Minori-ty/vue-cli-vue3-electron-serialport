import serialport from 'serialport'

function openPort(port) {
    return new serialport(
        port,
        {
            baudRate: 9600, //波特率
            dataBits: 8, //数据位
            parity: 'none', //奇偶校验
            stopBits: 1, //停止位
            flowControl: false,
        },
        false
    )
}

export { openPort }
