import { Test, TestingModule } from '@nestjs/testing';
import { ChatSessionService } from './chat-session.service';
import { ChatSessionRepositoryPort } from '../../repository';
import { StatusEnum } from '../../entity';
import { CHAT_SESSION_SERVICE_TOKEN, MONGOOSE_CHAT_SESSION_REPOSITORY_TOKEN } from '@notification/common';

describe('ChatSessionService', () => {
    let service: ChatSessionService;
    let repository: ChatSessionRepositoryPort;

    // 1. Mock chat session repository
    const mockChatSessionRepository = {
        add: jest.fn(),
        updateById: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: CHAT_SESSION_SERVICE_TOKEN,
                    useClass: ChatSessionService,
                },
                {
                    provide: MONGOOSE_CHAT_SESSION_REPOSITORY_TOKEN,
                    useValue: mockChatSessionRepository,
                }
            ],
        }).compile();

        service = module.get<ChatSessionService>(CHAT_SESSION_SERVICE_TOKEN);
        repository = module.get<ChatSessionRepositoryPort>(MONGOOSE_CHAT_SESSION_REPOSITORY_TOKEN);
    });

    it('CreateOK - Create a chat session and return id.', async () => {
        // --- ARRANGE 
        const mockId = 'generated-uuid-123';
        const command = {
            id: mockId,
            channelId: 'channel-1',
            title: 'Hỗ trợ kỹ thuật',
            userId: 99,
        };
        const returnId = mockId;
        mockChatSessionRepository.add.mockResolvedValue(returnId);

        // --- ACT ---
        const result = await service.create(command);

        // --- ASSERT ---
        expect(repository.add).toHaveBeenCalledWith(
            expect.objectContaining({
                status: StatusEnum.NEW,
            }),
        );
        expect(result).toBe(mockId);
    });

    it('Create Not Ok - Create a chat session and return id.', async () => {
        // --- ARRANGE 
        const mockId = 'generated-uuid-123';
        const command = {
            id: mockId,
            channelId: 'channel-1',
            title: 'Hỗ trợ kỹ thuật',
            userId: 99,
        };
        const returnId = null;
        mockChatSessionRepository.add.mockResolvedValue(returnId);

        // --- ACT ---
        const result = await service.create(command);

        // --- ASSERT ---

        expect(result).toBe(returnId);
    });

    it('UpdateOk - Update the chat session.', async () => {
        // --- ARRANGE 
        const id = 'generated-uuid-123';
        const updateData = { status: StatusEnum.DOING, title: "Update Title" };
        mockChatSessionRepository.updateById.mockResolvedValue(true);

        // --- ACT ---
        const result = await service.updateById(id, updateData);

        // --- ASSERT ---
        expect(repository.updateById).toHaveBeenCalledWith(id, updateData);
        expect(result).toBe(true);
    });

    it('UpdateNotOk - Update the chat session.', async () => {
        // --- ARRANGE 
        const id = 'generated-uuid-123';
        mockChatSessionRepository.updateById.mockResolvedValue(false);
        // --- ACT ---
        const result = await service.updateById(id, {
            status: StatusEnum.DOING,
            title: "title"
        });
        // --- ASSERT ---
        expect(result).toBe(false);
    });
});