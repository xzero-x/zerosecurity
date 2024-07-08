#!/usr/bin/env node 

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import chalkAnimation from "chalk-animation";
import net from 'net';




const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const title = 'ZeroSecurity';
    
    figlet(title, (err, data) => {
        console.log(gradient.pastel.multiline(data))
    });

    await sleep()
}

async function Desc() {
    const description = chalkAnimation.rainbow('-- Welcome to zerosecurity scanner, enter IP to scan for ports --')

    await sleep()
    description.stop()
}

const startPort = 1;
const endPort = 1023;

let targetIP;

async function getIP() {
    const answer = await inquirer.prompt({
        name: 'target_IP',
        type: 'input',
        message: 'Enter IP:',
        default() {
            return 'IP';
        },
    });

    targetIP =  answer.target_IP;
}

function scanPort(port) {
    
    const socket = new net.Socket();
    socket.setTimeout(2000);

    socket.on("connect", () => {
        console.log(`Port ${port} open on ${targetIP}`);
        socket.destroy();
    })

     socket.on("timeout", () => {
        console.log(`Port ${port} close on ${targetIP}`);
        socket.destroy();
    })

     socket.on("error", (err) => {
        console.log(`Error: ${err}`);
    }) 

    socket.connect(port, targetIP);

}

async function portscanner() {
    for (let port = startPort; port <= endPort; port++) {
        scanPort(port);
     }
}

async function checkingIP() {
    const spinner = createSpinner('Scanning IP...').start()
    await sleep()
    spinner.stop()

}

await welcome()
await Desc()
await getIP()
await checkingIP()
await portscanner()