import { reactive } from "vue";
import { io, Socket } from "socket.io-client";

interface State {
  connected: boolean;
}

export const state: State = reactive<State>({
  connected: false
});

// Determine the URL based on the environment
const URL: string | undefined = process.env.NODE_ENV === "production" ? window.location.origin : "http://localhost:3000";

export const socket: Socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});
