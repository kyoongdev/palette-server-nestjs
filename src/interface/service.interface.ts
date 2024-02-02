export const SERVICE_TYPE = {
  ARTIST: 'ARTIST',
  MR_BEAT: 'MR_BEAT',
  RECORDING: 'RECORDING',
  MIX_MASTERING: 'MIX_MASTERING',
  ALBUM_ART: 'ALBUM_ART',
};

export type ServiceType = keyof typeof SERVICE_TYPE;
