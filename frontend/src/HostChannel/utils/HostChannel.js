
/**
 *
 * @typedef {import("./types").HostMessage} HostMessage
 * @typedef {import("./types").ComponentMessage} ComponentMessage
 */

export default class HostChannel {
  /**
   *
   * @type {MessagePort}
   */
  port;

  /**
   *
   * @type {(msg: HostMessage) => void}
   */
  onMessage;

  /**
   *
   * @param {HostChannel['onMessage']} onMessage
   */
  constructor(onMessage) {
    this.onMessage = onMessage;
    this._onConnected = this._onConnected.bind(this);
  }

  /**
   *
   * @param {ComponentMessage} message
   */
  sendMessage(message) {
    this.port?.postMessage(message);
  }

  connect() {
    window.addEventListener("message", this._onConnected);
    window.parent.postMessage({ type: "connect" }, "*");
  }

  disconnect() {
    window.removeEventListener("message", this._onConnected);
  }

  /**
   *
   * @param {MessageEvent} event
   */
  _onConnected(event) {
    if (event.data.type === "connected") {
      this.port = event.ports[0];

      this.port.onmessage = (event) => {
        this.onMessage?.(event.data);
      };

      this.onMessage?.(event.data);
    }
  }
}