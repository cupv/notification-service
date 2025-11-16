import { Test } from '@nestjs/testing';
import { NotificationConsumer } from './notification.consumer';
import { CREATE_NOTIFICATION_SERVICE_TOKEN } from '@notification/common';
import { CreateNotificationServicePort } from '@notification/domain';

describe('NotificationConsumer', () => {
  let consumer: NotificationConsumer;
  let mockUseCase: jest.Mocked<CreateNotificationServicePort>;

  beforeEach(async () => {
    mockUseCase = {
      execute: jest.fn(),
    } as any;

    const module = await Test.createTestingModule({
      controllers: [NotificationConsumer],
      providers: [
        {
          provide: CREATE_NOTIFICATION_SERVICE_TOKEN,
          useValue: mockUseCase,
        },
      ],
    }).compile();

    consumer = module.get(NotificationConsumer);
  });

  it('should call use case with valid payload', async () => {
    const payload = { title: 'Hi', receiverId: 1 };
    await consumer.handleNotificationCreated(payload);
    expect(mockUseCase.execute).toHaveBeenCalledWith(payload);
  });

  it('should not throw when use case succeeds', async () => {
    mockUseCase.execute.mockResolvedValue(undefined);
    await expect(consumer.handleNotificationCreated({})).resolves.not.toThrow();
  });

  it('should throw when use case fails', async () => {
    const error = new Error('DB error');
    mockUseCase.execute.mockRejectedValue(error);
    await expect(consumer.handleNotificationCreated({})).rejects.toThrow(
      'DB error',
    );
  });

  it('should handle null payload', async () => {
    await consumer.handleNotificationCreated(null);
    expect(mockUseCase.execute).toHaveBeenCalledWith(null);
  });

  it('should handle undefined payload', async () => {
    await consumer.handleNotificationCreated(undefined);
    expect(mockUseCase.execute).toHaveBeenCalledWith(undefined);
  });

  it('should pass incomplete payload to use case', async () => {
    const payload = { title: 'Only title' };
    await consumer.handleNotificationCreated(payload);
    expect(mockUseCase.execute).toHaveBeenCalledWith(payload);
  });

  it('should handle multiple messages sequentially', async () => {
    const p1 = consumer.handleNotificationCreated({ id: 1 });
    const p2 = consumer.handleNotificationCreated({ id: 2 });
    await Promise.all([p1, p2]);
    expect(mockUseCase.execute).toHaveBeenCalledTimes(2);
  });
});
