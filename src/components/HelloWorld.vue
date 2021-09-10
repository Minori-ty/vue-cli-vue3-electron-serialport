<template>
    <h1>串口调试</h1>
    <button @click="openCom2('COM2')">打开COM2</button>
    <button @click="openCom3('COM3')">打开COM3</button>
    <button @click="closeCOM2">关闭COM2</button>
    <button @click="closeCOM3">关闭COM3</button>
</template>
<script setup>
import iconv from 'iconv-lite'
import { openPort } from '../hooks'
var COM3 = null
var COM2 = null
var timer = null

const closeCOM2 = () => {
    if (COM2?.isOpen) {
        console.log('关闭COM2')
        COM2.close(() => {})
        console.log(COM2.isOpen)
        return
    }
    console.log('COM2已关闭，请勿重复关闭')
}
const closeCOM3 = () => {
    if (COM3?.isOpen) {
        console.log('关闭COM3')
        COM3.close(() => {})
        console.log(COM3.isOpen)
        return
    }
    console.log('COM3已关闭，请勿重复关闭')
}

function openCom2(port) {
    if (!COM2?.isOpen) {
        try {
            console.log('打开COM2')
            COM2 = openPort(port)
            clearInterval(timer)
            var a = 1
            timer = setInterval(() => {
                COM2.write(`COM2发送的数据---${a}`)
                a++
            }, 1000)
        } catch (e) {
            console.log('无法打开COM2，请检查是否在其他设备打开了COM2')
        }

        return
    }
    console.log('COM2已打开，请勿重复打开')
}

function openCom3(port2) {
    if (!COM3?.isOpen) {
        console.log('打开COM3')
        COM3 = openPort(port2)
        if (COM2?.isOpen) {
            COM3.on('readable', () => {
                console.log('COM3接收到COM2发送的数据：', COM3.read().toString())
            })
        } else {
            COM3.on('readable', () => {
                console.log('COM3接收到COM2发送的数据：', iconv.decode(COM3.read(), 'gbk'))
            })
        }

        return
    }
    console.log('COM3已打开，请勿重复打开')
}
</script>
<style></style>
