type Callback = (name: string, data?: any | null) => Promise<any>;
const logger = console.log.bind(console);
export const callback: Callback = (name: string, data?: any | null) => {
  return new Promise((resolve, reject) => {
    const uuid = Math.random().toString(36).substring(2);
    window.addEventListener(
      'message',
      (event: MessageEvent) => {
        const { command, response } = event.data as { command: string; response: any };
        logger('子页面得到数据', command, response);
        if (command === name + uuid) {
          resolve(response);
        }
      },
      { once: true }
    );
    logger('子页面发送数据', { name, uuid, data });
    window.parent.postMessage({ name, uuid, data }, '*');
  });
};
