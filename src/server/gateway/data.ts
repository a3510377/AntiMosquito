export interface Events {
  Hello: { heartbeat_interval: number };
}

export const opCode = {
  Heartbeat: 1, // send and Receive
  Identify: 2, // send
};
