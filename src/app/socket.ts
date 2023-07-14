import { io } from 'socket.io-client';

const URL = process.env.API_URL!;   // http://localhost:8080

console.log(`creating socket client instance on API_URL: ${URL}, process.env.API_URL: ${process.env.API_URL}`);
export const socket = io(URL);