import TuyaOAuth2Device from '../../lib/TuyaOAuth2Device';
import { TuyaStatus } from '../../types/TuyaTypes';

module.exports = class TuyaOAuth2DeviceDoorbell extends TuyaOAuth2Device {
  async onTuyaStatus(status: TuyaStatus, changedStatusCodes: string[]): Promise<void> {
    await super.onTuyaStatus(status, changedStatusCodes);

    if (changedStatusCodes.includes('alarm_message')) {
      try {
        const decoded = JSON.parse(Buffer.from(status['alarm_message'] as string, 'base64').toString('utf8'));
        this.log(`Decoded Message: ${JSON.stringify(decoded)}`);

        if (decoded.cmd === 'ipc_doorbell') {
          this.log('Doorbell Rang!', decoded);

          this.homey.flow
            .getDeviceTriggerCard('doorbell_rang')
            .trigger(this)
            .catch((err: Error) => this.error(`Error Triggering Doorbell Rang: ${err.message}`));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        this.error(`Error Parsing Message: ${err.message}`);
      }
    }
  }
};
