export class NotificationEntity {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly content: string,
    public readonly redirectUrl: string,
    public readonly receiverId: number,
    public readonly lastSeenAt: Date | null,
    public readonly createdAt: Date
  ) {}
}