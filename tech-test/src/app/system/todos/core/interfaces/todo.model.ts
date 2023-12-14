export class TodoModel {
  constructor(
    public label: string,
    public description: string,
    public category: string | null,
    public id: number = Date.now(),
    public done: boolean = false,
  ) {}
}
