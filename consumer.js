const mqtt = require('mqtt');
const dotenv = require('dotenv');
const debug = require('debug')('chatopic');

dotenv.config();

const mqttConfig = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

const client = mqtt.connect(mqttConfig);

client.on('connect', () => {
  debug('Connected to MQTT broker');
  client.subscribe(process.env.MQTT_TOPIC);
});

client.on('message', (topic, message) => {
  debug(`Received message on topic ${topic}: ${message.toString()}`);
});

client.on('error', (error) => {
  debug(`Error occurred: ${error}`);
});
