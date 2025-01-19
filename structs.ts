export type IFriendStatus = 'friends' | 'requests' | 'followers' | 'sent-requests' | 'following';//"friends"|'requests'|'followers';
export type VideoCategoryType = 'top' | 'review' | 'amv' | 'news' | 'other' | 'quiz';
export type ICommentable = 'anime' | 'post' | 'review' | 'user' | 'blogvideo' | 'collection';
type AcceptedLanguageType = 'ru' | 'en' | 'ua';

export type Role = 'root' | 'admin' | 'supereditor' | 'editor' | 'chatadmin' | 'videoblogger' | 'reviewer' | 'newsroom';

//export

export interface SkipTimeJson {
    time: number;
    length: number
}

export interface IOneVideoJson {
    video_id: number;
    number: string;
    iframe_url: string;
    data: {
        player: string;
        dubbing: string;
    };
    date: number;
    index: number;
    skips: {
        opening: SkipTimeJson | null;
        ending: SkipTimeJson | null
    }
    watched?: {
        end_time: number;
        date: number;
    }
    subscribed?: boolean;
}

export interface IFeedVideoJson extends IAnimeJson {
    date: number;
    ep_title: string;
    player_title: string;
    dub_title: string;
    video_id: number;
}

export interface IViewingOrderJson {
    title: string;
    rating?: number;
    anime_status: IAnimeStatus;
    anime_url: string;
    year: number;
    type: IAnimeType;
    poster: PosterJson;
    // Viewing order properties
    anime_id: number;
    data: {
        text: string;
        id: number;
        index: number;
    },
    description: string,
    user?: IUserAnimeInfo;
}

export interface PosterJson {
    /**
     * Small poster - 33x47px
     */
    small: string;
    /**
     * Medium poster - 184x260px
     */
    medium: string;
    /**
     * Big poster - 250x350px
     */
    big: string;
    /**
     * Poster with responsive size
     */
    fullsize: string;
    /**
     * Huge poster - 400x560
     */
    huge: string;
}

export interface IAnimeFavoriteJson extends Omit<IAnimeJson, "description"> {
    type: IAnimeType;
    date: number;
    year: number;
    user: IUserAnimeInfo;
    genres: IGenreJson[];
    rating: number;
    anime_status: IAnimeStatus;
    next_episode?: number;
}

export interface ICommentJson {
    user_id: number;
    roles: Role[]
    deleted_at: number;
    name: string;
    id: number;
    time: number;
    likes: number;
    dislikes: number;
    text: string;
    avatars: AvatarJson;
    vote?: number;
    children_count: number;
    parent_id?: number;
    /**In profile comments - data about comment element*/
    item_data?: {
        posters?: PosterJson;
        title?: string;
        url?: string;
    };
}

export interface ICommentJsonComplaint extends ICommentJson {
    reason: {
        title: string;
        key: number;
    };
    from_user: {
        id: number;
    };
    /**Complain comment object data*/
    item_data_complain: {
        posters?: PosterJson;
        title?: string;
        url?: string;
    };
}

export interface OtherIdsJson {
    vk?: number;
    tg_nickname?: string;
    shikimori?: {
        nickname: string;
        id: number;
    }
}

export interface IUserJson {
    id: number;
    ids: OtherIdsJson;
    banned: boolean;
    register_date: number;
    roles: Role[];
    bdate: number;
    sex: 0 | 1 | 2;
    last_online: number;
    about: string;
    avatars: AvatarJson;
    nickname: string;
    texts?: {
        left: string;
        right: string;
        color: number;
    };
}

export type IHistoryView = {
    when: number;
    ep_count: number;
    duration: number;
}
export type IFriendsCounts = {
    friends: number;
    requests: number;
    followers: number;
    following: number;
    sentRequests: number;
}
export type IUserJsonFull = IUserJson & {
    reviewsCount?: number;
    watches: {
        sum: (IAnimeType & { spent_time: number })[],
        history: IHistoryView[]
    }
    friends?: IFriendsCounts;

    days_online: number;
    counts?: {
        1: 123,
        2: 193,
        3: 1242,
        4: 123,
        0: 123,
        5: 123
    }
}

export interface ICollectionJson {
    id: number;
    title: string;
    description: string;
    owner: IUserJsonNicknameAndAva;
    create_date: number;
    likes: ILikesJson;
    language: AcceptedLanguageType;
    animes: IOneAnimeSmallJson[];
    public: boolean;
    views: number;
    comments_count?: number;
}

export type ICollectionPreview = Omit<ICollectionJson, 'animes' | 'likes'> & { likes: Omit<ILikesJson, 'vote'> };
export type ICollectionMainJson = Omit<ICollectionJson, 'animes'> & {
    posterPreviews: PosterJson[];
}

export interface IProfileJson extends IUserJson {
    notifications: {
        vk: boolean;
        telegram: boolean;
    }
    lists_privacy: 'public' | 'friends' | 'authed' | 'none';
    privacy: {
        vk_public: boolean;
        tg_public: boolean;
        shiki_public: boolean;
    }
}

export interface IFriendJson {
    id: number;
    banned: boolean;
    last_online: number;
    sex: 0 | 1 | 2;
    avatars: AvatarJson;
    nickname: string;
    roles: Role[];
    list: IFriendStatus;
    ids: OtherIdsJson;

}

export interface VideoBodyJson {
    has_spoiler: boolean;
    title: string;
    descriptions: { small: string; full: string }
    iframe: string;
    anime_ids: VideoAnimeBodyJson[];
    category: VideoCategoryType;
    previews: {
        small: string;
        big: string;
    }
    language?: AcceptedLanguageType;
}

export interface VideoAnimeBodyJson {
    id: number;
    timing: number;
}

export interface ITrailerJson {
    trailer_id: number;
    anime_id: number;
    iframe_url: string;
    dubbing: string;
    player: string;
    number: string;
}

export interface IAnimeJson {
    do_not_recommend?: boolean;
    anime_id: number;
    anime_url: string;
    poster: PosterJson;
    title: string;
    description: string;
}

export interface IScheduleAnimeJson extends IAnimeJson {
    episodes: IOneAnimeJson['episodes'];
}

export interface IOneAnimeSmallJson extends IAnimeJson {
    year: number;
    anime_status: IAnimeStatus;
    season: number;
    min_age: { value: number, title: string | null; titleLong: string | null };
    user?: IUserAnimeInfo;
    type: IAnimeType;
    views: number;
    rating?: {
        counters: number;
        average: number;
    }
    remote_ids: {
        worldart_id: number;
        worldart_type?: 'animation' | 'cinema';
        shikimori_id: number;
        sr_id?: number;
        kp_id?: number;
        myanimelist_id?: number;
        anilibria_alias?: string;
        anidub_id?: number;
    };
}

export interface IMessageEditionWriteJson {
    message_edition_write_id: number,
    edited_by_id: number,
    reason_edit: string,
    new_text: string,
    message_id: number,
    date: number,
}


export type IOneGenreCatalog = {
    genres: ({
        title: string,
        href: string,
        value: number,
        more_titles: string[],
        group_id: number
    })[], groups: ({ title: string, id: number })[]
};


export interface IMessageDeletionWriteJson {
    message_deletion_write_id: number,
    message_id: number,
    delete_by_id: number,
    date: number,
    deleted: boolean,
    reason_deletion: boolean
}

export interface IScreenShotJson {
    episode: string;
    time: number;
    sizes: {
        /*250x150px*/
        small: string;
        /*Full HD*/
        full: string;
    }
    id: number;
}

export interface IOneAnimeJson extends IOneAnimeSmallJson {
    original: string;
    comments_count: number;
    reviews_count: number;
    other_titles: string[];
    posts_count: number;
    rating?: {
        counters: number;
        average: number;


        worldart_rating?: number;
        shikimori_rating?: number;
        kp_rating?: number;
        myanimelist_rating?: number;
        anidub_rating?: number;
    },
    remote_ids: {
        worldart_id: number;
        worldart_type?: 'animation' | 'cinema';
        shikimori_id: number;
        sr_id?: number;
        kp_id?: number;
        myanimelist_id?: number;
        anilibria_alias?: string;
        anidub_id?: number;
    };
    creators: ICreatorJson[];
    studios: IStudioJson[];
    videos?: IOneVideoJson[];
    genres: IGenreJson[];
    viewing_order: IViewingOrderJson[],
    translates: ITranslate[];
    blocked_in: string[];
    episodes: {
        aired: number;
        count: number;
        next_date: number | null
    }
    random_screenshots: IScreenShotJson[];
    top: {
        global: number;
        category: number;
    }
}


export interface IListStatus {
    title: string;
    href: string;
    id: 0 | 1 | 2 | 3 | 5 | 4;
}

export interface IAnimeVideoPreview extends IAnimeJson {
    time?: number;
    type: IAnimeType;
    year: number;
    anime_status: IAnimeStatus;
}

export interface IAnimeType {
    value: number;
    name: string;
    shortname: string;
}

export interface IAnimeStatus {
    value: number;
    alias: 'released' | 'ongoing' | 'announcement' | 'Unknown';
    title: string;
    class: string;
}

export interface ITranslate {
    value: number;
    title: string;
    href: string;
}

export interface IUserAnimeInfo {
    rating: number;
    list: {
        is_fav: boolean;
        // value:  0|1|2|3|-1|5;
        list: IListStatus | null
    }
}

export interface MainPageJson {
    announcements: IAnimeJson[];
    recommends: IAnimeJson[];
    new_videos: IFeedVideoJson[];
    top_carousel: {
        season: number;
        year: number;
        items: IAnimeJson[];
    },
    'new': IAnimeJson[];
    last_watches: ILastWatchJson[];
    schedule: IScheduleAnimeJson[];
    posts: {
        items: IPostJsonSmall[];
        types: ({ id: number, title: string, uri: string })[]
    }
    blogger: {
        people: {
            count: number;
            items: IUserJsonNicknameAndAva[],
        },
        videos: {
            items: IBloggerVideoAnimeJson[],
            categories: VideoCategoryJson[]
        },
    }
    collections: ICollectionMainJson[];

}

export interface ILastWatchJson extends IAnimeJson {
    date: number;
    end_time: number;
    ep_title: string;
    video_id: number;
    duration: number;
    screenshot: IScreenShotJson | null;
}


export interface IGenreJson {
    title: string;
    url: string;
    id: number;
    alias: string;
}

export interface IGenreJsonFull extends IGenreJson {
    description: string;
    subGenres: IGenreJson[];
}

export interface AvatarJson {
    /**
     * Image size with 90x90px
     */
    small: string;
    /**
     * Image size with 200x200px
     */
    big: string;
    /**
     * Image size with 250x250px
     */
    full: string;
}

export interface AnimeRatingsJson {
    rating: number;
    count: number
}

interface IUrl {
    url: string;
    title: string
}

export interface ICreatorJson extends IUrl {
    id: number;
}

export interface IStudioJson extends IUrl {
    id: number;
}

export interface IBanJson {
    moderator: {
        id: number;
        nickname: string;
    };
    user: IUserJson;
    ban: {
        id: number;
        end: number;
        reason: string | null;
        active: boolean;
        is_unban: boolean;
    }
}

export interface IOneMessageDialogJson {
    last_message: string;
    roles: Role[]
    unread_count: number;
    nickname: string;
    avatars: AvatarJson;
    user_id: number;
    banned: boolean;
}

export interface IMessageHistory {
    avatars: AvatarJson,
    new_text: string | undefined,
    nickname: string,
    date: number,
    old_text: string,
    user_id: number,
    change_type: "edit" | "restore" | "delete" | "add"
}

export interface IClaimedMessageJson {
    message_id: number,
    user_id: number,
    reason: number,
    date_complaints: number,
    is_closed: boolean,
    avatars: AvatarJson,
    nickname: string,
    message: {
        text: string;
        is_chat: boolean;
        owner: {
            nickname: string;
            id: number;
        }
    }
    status_complaints: MessageStatusComplaints,
    claim_id: number,
    is_last: boolean
}

export interface IOneMessageJson {
    id: number;
    to_id: number;
    from_id: number;
    avatars: AvatarJson;
    date: number;
    nickname: string;
    text: string;
    read: boolean;
    deleted: boolean;
    edited: boolean;
    roles: Role[];
    edited_by_id?: number;
    deleted_by_id?: number;
    answer_to_id: number | null;
    message_to_answer: string | null;
    user_to_answer: {
        nickname: string;
        avatars: AvatarJson;
        id: number;
    } | null;
}

export interface IMessageChangeBase {
    NickName: string,
    Date: Date,
    OldText: string,
    UserId: number,
    AvaVersion: number

}

export interface IEditionWrite extends IMessageChangeBase {
    NewText: string
}

export interface IDeletionWrite extends IMessageChangeBase {
    Deleted: boolean
}

export interface IClaimedMessages {
    MessageComplaintsId: number,
    MessageId: number,
    UserId: number,
    Reason: number,
    DateComplaints: Date,
    IsClosed: boolean,
    AvaVersion: number,
    NickName: string,
    Message: string,
    IsChat: boolean,
    MessageOwnerNickName: string,
    MessageOwnerUserId: number,
    StatusComplaints: MessageStatusComplaints,
    IsLast: boolean
}

export enum MessageStatusComplaints {
    Add = 0,
    Reject = 1,
    Approved = 2,
    Resotred = 3,
    Argue = 4
}

export interface INotificationJson {
    id: number;
    text_html: string;
    title_html: string;
    date: number;
    click_uri: string;
}

export type NotificationType =
    'news'
    | 'edit'
    | 'message'
    | 'comment'
    | 'animeupdate'
    | 'review'
    | 'friend'
    | 'viewingorderupdate';

export interface INotificationFULL extends INotificationJson {
    deleted: boolean;
    viewed: boolean;
    sub_id: number;
    type: NotificationType;
}

export interface VideoCategoryJson {
    title: string;
    id: VideoCategoryType;
}

export interface IBloggerVideoAnimeJson {
    has_spoiler: boolean;
    publish_date: number;
    time?: number;
    creator: {
        avatars: AvatarJson;
        nickname: string;
        id: number;
    };
    title: string;
    descriptions: {
        small: string;
        big: string;
    }
    id: number;
    category: VideoCategoryJson;
    comments_count: number;
    previews: {
        small: string;
        big: string;
    }
    iframe_url: string;
    views: number;
    language: AcceptedLanguageType;
    likes: ILikesJson;
}

export interface ILikesJson {
    likes: number;
    dislikes: number;
    vote: 0 | 1 | -1;
};


export interface IBloggerVideoFullJson extends IBloggerVideoAnimeJson {
    animes: IOneAnimeSmallJson[];
}

export interface RegisterFormData {
    email: string;
    password: string;
    password_repeat: string;
    username: string;
    'g-recaptcha-response': string;
    hash?: string;
    shiki?: string;
}

export interface IReviewJson {
    review_id: number;
    update_date: number;
    create_date: number;

    anime_id: number;
    type: 'approved' | 'waiting' | 'declined';
    published_by: number;
    commentable: boolean;
    rating?: {
        average?: number;
        // title -> value
        category: { Music: number, "No plot": number }
    }
    check_comment?: string;
    views: number;
    author: IUserJsonNicknameAndAva;

    likes: ILikesJson;
    /**
     * @Deprecated
     */
    user_id: number;
    /**
     * @Deprecated
     */
    total_likes: number;
    /**
     * @Deprecated
     */
    avatar: IUserJson['avatars']
    /**
     * @Depreacted
     */
    nickname: IUserJson['nickname']
    /**
     * @Deprecated
     */
    user_roles: IUserJson['roles'];

}


export type IReviewAnime = IReviewJson & {
    text_html: string;
}
export type IReviewJsonList = IReviewJson & {
    anime: IOneAnimeSmallJson;
    comments_count: number;
}
export type IReviewFullJson = IReviewJsonList & {
    text_html: string;
    reviews_count: number;
}

export interface IOneAppJsonSmall {
    description: string;
    name: string;
    app_id: number
    created_at: number
    owner: IUserJsonNicknameAndAva;
}

export interface IOneAppJson extends IOneAppJsonSmall {
    public_token: string;
    private_access_token: string;
}

export interface IUserJsonNicknameAndAva {
    id: number;
    nickname: string;
    avatars: AvatarJson;
}

export type IPasskeyJson = {
    credential_id: string;
    authenticator_type: "platform" | "cross-platform";
    created_at: number;
    updated_at: number;
    rely_party_id: string;
}


export interface IPostJsonSmall {
    id: number;
    title: string;
    category: { title: string, id: number, uri: string };
    created_at: number;
    user: IUserJsonNicknameAndAva;
    content_preview: string;
    preview_image: string | null;
}

export interface IPostJson extends Omit<IPostJsonSmall, 'content_preview'> {
    edited_at: number;
    content: string;
    comments: number;
    views: number;
    likes: ILikesJson;
    animes: IOneAnimeJson[];
}

export interface IEditJson {
    edit_id: number;
    creator: IUserJsonNicknameAndAva;
    edits_count: number;
    date: number;
    who_voted: {
        likes: IUserJsonNicknameAndAva[];
        dislikes: IUserJsonNicknameAndAva[];
    },
    status: 'open' | 'applied' | 'declined';
    anime: { anime_id: number; anime_uri: string; title: string; poster: PosterJson; };
}

export interface IBloggerJson extends IUserJsonNicknameAndAva {
    subscriptions: number;
    is_subscribed: boolean;
    videos_count: number;

    categories: VideoCategoryJson[]
}


export interface OneGenre {
    title: string,
    href: string,
    value: number,
    more_titles: string[],
    group_id: number

}

export interface OneGenreGroup {
    title: string,
    id: number
}
