export class Fabricplan{
  id: number;
  description: string; 
  operationsIds: Array<number> = [];
  dateStart: Date; 
  duration: number;
}