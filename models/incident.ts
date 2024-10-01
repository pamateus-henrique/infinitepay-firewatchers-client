export interface IncidentOverview {
  id: number;
  title: string;
  type: string;
  severity: string;
  summary: string;
  status: string;
  impactStartedAt: string;
  reporter: string;
  leadAvatar: string;
}
