export type StringOrArray<T = string> = string | T[];

export interface FilterAnimeGetParams {
    genres?: StringOrArray;
    exclude_genres?: StringOrArray;
    types?: StringOrArray;
    translates?: StringOrArray;
    status?: StringOrArray<
        "released" | "0" | "ongoing" | "1" | "announcement" | "announce" | "2"
    >;
    season?: StringOrArray<
        | "winter"
        | "spring"
        | "summer"
        | "autumn"
        | "fall"
        | "4"
        | "3"
        | "2"
        | "1"
    >;
    from_year?: string;
    to_year?: string;
    need_videos?: "1" | "0";
    director_ids?: StringOrArray;
    ep_from?: string;
    ep_to?: string;
    min_age?: string;
    sort?: AnimeFilterSort;
    sort_forward?: "true" | "false" | "0" | "1";
    limit: string | number;
    offset: string | number;
    ids?: StringOrArray;
    id?: StringOrArray;
    q?: string;

    max_rating?: string;
    min_rating?: string;

    min_rating_counters?: string;
    max_rating_counters?: string;
    require_fields?: StringOrArray;
    shikimori_ids?: StringOrArray<number>;
    kp_ids?: StringOrArray<number>;
    studio_ids?: StringOrArray<number>;
    mal_ids?: StringOrArray<number>;
}

export type AnimeFilterSort =
    | "title"
    | "year"
    | "rating"
    | "rating_counters"
    | "views"
    | "top"
    | "random"
    | "id";

export interface UsersSearchGetParams {
    sex?: "all" | "m" | "w";
    groups?: StringOrArray<
        | "editor"
        | "supereditor"
        | "admin"
        | "root"
        | "chatadmin"
        | "videoblogger"
        | "reviewer"
    >;
    order_by?:
        | "a_z"
        | "z_a"
        | "regdate_asc"
        | "regdate_desc"
        | "lastonline_asc"
        | "lastonline_desc";
    /**
     * User's nickname that user starts with
     */
    nickname?: string;
    offset?: number;
    limit?: number;
    ip?: string;
    ipv6?: string;
}

export interface PostMessage {
    message: string;
    answer_msg_id: number | undefined;
}

export interface PostDeleteMessageBody {
    reason?: string;
    message_id: number;
    is_deleted?: boolean;
}

export interface PostEditMessageBody {
    message_id: number;
    reason_edition?: string;
    new_text: string;
}

export interface PostMessageVote {
    reason: number;
}

export interface PUTReviewBody {
    anime_id: number;
    text: string;
    commentable?: boolean;
    rating: {
        average?: number;
        category: Array<{
            category: string;
            average: number;
        }>;
    };
}

export interface GetReviewsQueryMany {
    sort: string;
    limit: number;
    offset: number;
    type: "approved" | "declined" | "waiting";
}

export interface IStatisticParam {
    // node-id
    [k: number]: {
        // date: percent
        [k: number]: number;
    };
}
