import { Nullable } from "../../../00.common/types";
import { ChatSessionEntity, StatusEnum } from "../../../01.domain/entity";

export interface CreateChatSessionCommand {
    id: string;
    title: string;
    channelId: string;
    userId: number
}

export interface UpdateChatSessionCommand {
    title: string;
    status: StatusEnum;
}

export interface ChatSessionServicePort {
    create(command: CreateChatSessionCommand): Promise<string>
    updateById(id: string, command: UpdateChatSessionCommand): Promise<boolean>
    getById(id: string): Promise<Nullable<ChatSessionEntity>>;

}