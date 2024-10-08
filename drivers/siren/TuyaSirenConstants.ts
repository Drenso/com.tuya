export const SIREN_CAPABILITIES_MAPPING = {
  alarm_switch: 'onoff',
} as const;

export const SIREN_SETTING_LABELS = {
  alarm_volume: 'Alarm volume level',
} as const;

export const SIREN_CAPABILITIES = {
  read_write: [],
  read_only: [],
  setting: ['alarm_volume'],
} as const;

export const SIREN_FLOWS = {
  setting: ['alarm_volume'],
} as const;

export type HomeSirenSettings = {
  alarm_volume: 'low' | 'middle' | 'high';
};

export type TuyaSirenSettings = {
  alarm_volume: 'low' | 'middle' | 'high';
};
