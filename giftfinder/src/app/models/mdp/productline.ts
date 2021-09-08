export class ProductLine{
    id: number;
    machinesIds: Array<number>;
    description: string;
    productionLineNumber: number;
    dateOperationStarted: Date;
    dateOperationFinished: Date;
    active: boolean;
    dailyProductionCapacity: number;
}