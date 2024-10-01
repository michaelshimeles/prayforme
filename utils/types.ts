export type Prayer = {
  id: number;
  created_at: string;
  content: string;
  request_id: string;
  num_of_prayers: string;
  encouragement: string;
};

export type PrayerResponse = {
  id: bigint;
  created_at: Date;
  content: string | null;
  request_id: string | null;
  num_of_prayers: string | null;
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
