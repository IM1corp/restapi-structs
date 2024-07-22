import { INotificationJson, IOneMessageJson } from "./database";
export type ClientEventTypes = 'message-read' | 'new-message' | 'notification' | 'error' | 'statistics' | 'message-deleted' | 'message-edited';
export type ServerEventTypes = 'read-messages' | 'chat-subscribe' | 'subscribe-events' | 'unsubscribe-events';
export interface ClientEvent {
    event: ClientEventTypes;
    [k: string]: unknown;
}
export interface ErrorEvent extends ClientEvent {
    event: 'error';
    error: string;
    error_code?: number;
    error_name?: string;
}
export interface StatisticsUpdateEvent extends ClientEvent {
    event: 'statistics';
    users: {
        count: number;
        online: number;
    };
    animes: {
        count: number;
    };
    comments: {
        count: number;
    };
    reviews: {
        count: number;
    };
    tabs: {
        count: number;
    };
    episodes: {
        h1: number;
        h3: number;
        h12: number;
        h24: number;
    };
}
export interface NewNotificationEvent extends ClientEvent {
    event: 'notification';
    message: INotificationJson;
}
export interface NewMessageEvent extends ClientEvent {
    message: IOneMessageJson;
    event: 'new-message';
}
export interface MessageReadEvent extends ClientEvent {
    event: 'message-read';
    user_id: number;
    is_owner: boolean;
}
export interface MessageEditedEvent extends ClientEvent {
    event: 'message-edited';
    message: IOneMessageJson;
}
export interface MessageDeletedEvent extends ClientEvent {
    event: 'message-deleted';
    message: IOneMessageJson;
}
export interface WebSocketEvent {
    event: ServerEventTypes;
}
export interface SendMessage {
    message: string;
    to_user: number;
    answer_to: number | null;
}
export interface ReadMessage extends WebSocketEvent {
    event: 'read-messages';
    user_id: number;
}
export interface SubscribeForChatMessages extends WebSocketEvent {
    event: 'chat-subscribe';
    subscribe: boolean;
}
