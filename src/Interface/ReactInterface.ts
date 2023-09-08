//App.tsx
export interface chartProp {
  [key: string]: MemberPerformance;
}
export interface MemberPerformance {
  attack: number;
  damage: number;
}
//AttackRow.tsx
export interface RowProp {
  num: number;
  members: string[];
}
//Charts.tsx
export interface DataForChart {
  name: string;
  damage: number;
}
