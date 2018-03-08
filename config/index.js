module.exports = {
    logDir: process.env.LOG_DIR || "/var/log/garage-door-pi",
    logLevel: process.env.LOG_LEVEL || "debug",
    socketIoEndpoint: process.env.SOCKET_IO_ENDPOINT || "http://192.168.0.113:8000",
    garageOpenerOutputGpioPin: process.env.GARAGE_OPENER_OUTPUT_GPIO_PIN || 4,
    garageDoorSensorGpioPin: process.env.GARAGE_DOOR_SENSOR_GPIO_PIN || 17,
    garageDoorId: process.env.GARAGE_DOOR_ID || "00000000-0000-0000-0000-000000000000",
    heartbeatInterval: process.env.HEARTBEAT_INTERVAL || 15000
};