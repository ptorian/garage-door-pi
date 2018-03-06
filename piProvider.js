const { promisify } = require("util");
const { Gpio } = require('onoff');

class PiProvider {
    constructor(logger, garageOpenerOutputGpioPin, garageDoorSensorGpioPin) {
        this.logger = logger;

        this.garageOpenerOutput = new Gpio(garageOpenerOutputGpioPin, 'out');
        this.garageDoorOpenInput = new Gpio(garageDoorSensorGpioPin, "in", "both");
    }

    writeValue(gpio, value) {
        return new Promise((resolve, reject) => {
            gpio.write(value, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
    }

    readValue(gpio) {
        return new Promise((resolve, reject) => {
            gpio.read((err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            })
        });
    }

    async activateGarageDoorOpener() {
        this.logger.info("activating garage door opener");
        await this.writeValue(this.garageOpenerOutput, 1);
        await promisify(setTimeout)(200);
        this.logger.info("deactivating garage door opener");
        await this.writeValue(this.garageOpenerOutput, 0);
    }

    async getGarageDoorStatus() {
        return await this.readValue(this.garageDoorOpenInput);
    }

    watchGarageDoorOpenInput(callback) {
        this.getGarageDoorStatus()
            .then(initialValue => {
                callback(initialValue);
            });

        this.garageDoorOpenInput.watch((err, value) => {
            if (err) {
                this.logger.error(err);
            }

            callback(value);
        });
    }
}

module.exports = { PiProvider };