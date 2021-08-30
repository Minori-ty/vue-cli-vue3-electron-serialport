<template>
    <h1>串口调试</h1>
    <button @click="open">打开串口</button>
    <button @click="close">关闭串口</button>
</template>
<script setup>
import serialport from 'serialport'
var COM3 = null
var COM2 = null
var timer = null

const close = () => {
    COM3.close((e) => {
        console.log(e)
    })
    COM2.close((e) => {
        console.log(e)
    })
}

const open = () => {
    COM3 = new serialport(
        'COM3',
        {
            baudRate: 9600, //波特率
            dataBits: 8, //数据位
            parity: 'none', //奇偶校验
            stopBits: 1, //停止位
            flowControl: false,
        },
        false
    )
    COM2 = new serialport(
        'COM2',
        {
            baudRate: 9600, //波特率
            dataBits: 8, //数据位
            parity: 'none', //奇偶校验
            stopBits: 1, //停止位
            flowControl: false,
        },
        false
    )
    clearInterval(timer)
    var a = 1
    timer = setInterval(() => {
        COM2.write(`COM2发送的数据---${a}`)
        a++
    }, 1000)

    COM3.on('readable', () => {
        console.log('COM3接收到COM2发送的数据：', COM3.read().toString())
    })
}
</script>
<style></style>
