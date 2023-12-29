export class TodoModel {
  constructor(
    public label: string,
    public description: string,
    public category: string | null,
    public id: number | undefined = Date.now(),
    public done: boolean = false,
  ) {}
}

export type TodoWithoutId = Omit<TodoModel, "id">;
