export enum StatusEnum {
  NEW = 1,
  DOING,
  END
}

export class ChatSessionEntity {
  constructor(
    /**
     * UUIDv7
     */
    public readonly id: string,
    public readonly title: string,
    public readonly status: StatusEnum,
    public readonly channelId: string,
    public readonly userId: number,
    public readonly createdAt: Date,
    public readonly modifiedAt: Date
  ) { }
}