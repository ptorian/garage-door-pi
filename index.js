const socketIoClient = require("socket.io-client");

const config = require("./config");
const { PiProvider } = require("./piProvider");

const piProvider = new PiProvider(console, config.garageOpenerOutputGpioPin, config.garageDoorSensorGpioPin);
const socket = socketIoClient(config.socketIoEndpoint);

socket.on("connect", () => {
    console.log("socket.io connected");
});

socket.on("toggleGarageDoorState", async () => {
    await piProvider.activateGarageDoorOpener();
});

