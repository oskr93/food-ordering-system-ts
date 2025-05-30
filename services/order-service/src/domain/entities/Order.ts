export class Order {
  constructor(
    public id: string,
    public customer: string,
    public total: number,
    public status: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
