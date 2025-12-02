export interface Email {
  id: string;
  to: string;
  from: string;
  subject: string;
  body: string;
  createdAt: Date;
}

export class EmailEntity implements Email {
  constructor(
    public readonly id: string,
    public readonly to: string,
    public readonly from: string,
    public readonly subject: string,
    public readonly body: string,
    public readonly createdAt: Date
  ) {}

  static create(data: Omit<Email, 'id' | 'createdAt'>): EmailEntity {
    return new EmailEntity(
      crypto.randomUUID(),
      data.to,
      data.from,
      data.subject,
      data.body,
      new Date()
    );
  }
}
