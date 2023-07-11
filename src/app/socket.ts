import { io } from 'socket.io-client';

const URL = 'http://localhost:8080';

console.log("creating socket client instance...")
export const socket = io(URL);