import { Nullable } from "src/00.common/types";
import { ChatSessionEntity, StatusEnum } from "../../entity";
import { ChatSessionServicePort, CreateChatSessionCommand, UpdateChatSessionCommand } from "./chat-session.service.port";
import { ChatSessionRepositoryPort } from "../../repository";
import { Inject } from "@nestjs/common";
import { MONGOOSE_CHAT_SESSION_REPOSITORY_TOKEN } from "@notification/common";

export class ChatSessionService implements ChatSessionServicePort {
    constructor(
        @Inject(MONGOOSE_CHAT_SESSION_REPOSITORY_TOKEN)
        private readonly chatSessionRepository: ChatSessionRepositoryPort,
    ) { }

    async create(command: CreateChatSessionCommand): Promise<string> {
        const { channelId, title, userId, id } = command;

        const newId = await this.chatSessionRepository.add({
            id, channelId, status: StatusEnum.NEW, title, userId
        })

        return newId;
    }

    async updateById(id: string, command: UpdateChatSessionCommand): Promise<boolean> {
        const { status, title } = command;

        const isOk = await this.chatSessionRepository.updateById(id, { status, title });

        return isOk;
    }

    async getById(id: string): Promise<Nullable<ChatSessionEntity>> {

        const chatSession = await this.chatSessionRepository.findById(id);

        return chatSession
    }

}