import {IBloggerJson, INotificationJson, IOneAnimeJson, IOneMessageJson} from "./database";

export type SubscribableObjectType = 'blogger' | 'anime';

interface ClientEvent{
    event: string;
}
//client
export interface ErrorEvent extends ClientEvent {
    event: 'error';
    error: string;
    error_code?: number;
    error_name?: string;
}

export interface StatisticsUpdateEvent extends ClientEvent {
    event: 'statistics';
    users: { count: number; online: number; };
    animes: { count: number };
    comments: { count: number };
    reviews: { count: number };
    tabs: { count: number };
    episodes: {
        h1: number;
        h3: number;
        h12: number;
        h24: number;
    }
}

export interface NewNotificationEvent extends ClientEvent {
    event: 'notification'
    message: INotificationJson
}

export interface NewMessageEvent extends ClientEvent {
    message: IOneMessageJson;
    event: 'new-message'
}

export interface MessageReadEvent extends ClientEvent {
    event: 'message-read';
    user_id: number;
    is_owner: boolean;
}

export interface MessageEditedEvent extends ClientEvent {
    event: 'message-edited',
    message: IOneMessageJson
}

export interface MessageDeletedEvent extends ClientEvent {
    event: 'message-deleted',
    message: IOneMessageJson
}
export interface UpdateBloggerEvent extends ClientEvent {
    event: 'update-blogger';
    blogger_id: number;
    data: Partial<IBloggerJson>;
}
export interface UpdateAnimeEvent extends ClientEvent {
    event: 'update-anime';
    anime_id: number;
    data: Partial<IOneAnimeJson>;
}

export type AllClientEvents = {
    'error': ErrorEvent;
    'statistics': StatisticsUpdateEvent;
    'notification': NewNotificationEvent;
    'new-message': NewMessageEvent;
    'message-read': MessageReadEvent;
    'message-edited': MessageEditedEvent;
    'message-deleted': MessageDeletedEvent;
    'update-blogger':UpdateBloggerEvent;
    'update-anime': UpdateAnimeEvent;
    // Add other mappings as needed
};
export type ClientEventTypes = keyof AllClientEvents;

//server


export interface SendMessage {
    message: string;
    to_user: number;
    answer_to: number | null;
}

export interface ReadMessage {
    event: 'read-messages';
    user_id: number;
}

export interface SubscribeForChatMessages {
    event: 'chat-subscribe';
    subscribe: boolean;
}

export interface SubscribeGlobal {
    event: 'subscribe-global';
    /**
     * Object type to subscribe to
     */
    objectType: SubscribableObjectType;
    /**
     * Object id to subscribe to
     */
    objectId: number | string;
    /**
     * Unique key for this subscription
     */
    key: string;
}

export interface UnsubscribeGlobal {
    event: 'unsubscribe-global';
    objectType: SubscribableObjectType;
    objectId: number | string;
    key: string;
}

export type WebSocketEvents = {
    'subscribe-global': SubscribeGlobal;
    'unsubscribe-global': UnsubscribeGlobal;
    'chat-subscribe': SubscribeForChatMessages;
    'read-messages': ReadMessage;
    'subscribe-events': { event: 'subscribe-events' };
    'unsubscribe-events': { event: 'unsubscribe-events' };
    // Add other mappings as needed
};

export type ServerEventTypes = keyof WebSocketEvents;

