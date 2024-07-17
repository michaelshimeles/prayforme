export type Prayer = {
  id: number;
  created_at: string;
  content: string;
  requestId: string;
  numOfPrayers: string;
  encouragement: string;
};

export type PrayerResponse = {
  id: bigint;
  created_at: Date;
  content: string | null;
  requestId: string | null;
  numOfPrayers: string | null;
  encouragement: string | null;
};

export type FlaggedRequest = {
  flagged: boolean;
  message: string;
  error?: undefined;
};

export function isFlaggedRequest(response: any): response is FlaggedRequest {
  return response && response.flagged !== undefined;
}
