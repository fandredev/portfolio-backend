export interface WakatimeLanguage {
  name: string;
  total_seconds: number;
  percent: number;
  digital: string;
  text: string;
  hours: number;
  minutes: number;
}

export interface WakatimeEditor {
  name: string;
  total_seconds: number;
  percent: number;
  digital: string;
  text: string;
  hours: number;
  minutes: number;
}

export interface WakatimeStatsData {
  languages: WakatimeLanguage[];
  editors: WakatimeEditor[];
}

export interface WakatimeStatsResponse {
  data: WakatimeStatsData;
}
