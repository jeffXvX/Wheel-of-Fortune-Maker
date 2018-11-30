export class ChangeCategoryName {
    static readonly type = '[Category] Change Name';
    constructor(public id: number, public name: string) {}
}