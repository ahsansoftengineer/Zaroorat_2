export interface Notification {
  id: number;
  heading: string;
  type:string; // (Admin / Marketing / Promotions / User / Subscribe)
  shortPara: string;
  fullPara: string;
  date: Date;
  presedence: string // (success, danger, warning)
}
