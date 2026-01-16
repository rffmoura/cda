export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface Store {
  id: number;
  store: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
}

export interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
}

export interface Publisher {
  id: number;
  name: string;
  slug: string;
}

export interface PlatformRequirements {
  minimum?: string;
  recommended?: string;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  released: string;
  tba: boolean;
  background_image: string;
  background_image_additional?: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: AddedByStatus;
  metacritic: number | null;
  playtime: number;
  suggestions_count: number;
  updated: string;
  user_game: unknown;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: {
    platform: Platform;
    requirements?: PlatformRequirements;
  }[];
  parent_platforms: {
    platform: Platform;
  }[];
  genres: Genre[];
  stores: Store[];
  clip: string | null;
  tags: Tag[];
  esrb_rating: EsrbRating | null;
  short_screenshots: Screenshot[];
  description?: string;
  description_raw?: string;
  developers?: Developer[];
  publishers?: Publisher[];
  website?: string;
}

export interface MetacriticPlatform {
  metascore: number;
  url: string;
  platform: {
    platform: number;
    name: string;
    slug: string;
  };
}

// Interface para o endpoint GET /games/{id} que retorna mais campos
export interface GameDetails extends Game {
  description: string;
  description_raw: string;
  metacritic_platforms: MetacriticPlatform[];
  metacritic_url: string;
  screenshots_count: number;
  movies_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  alternative_names: string[];
  developers: Developer[];
  publishers: Publisher[];
  game_series_count: number;
}

export interface FetchGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export interface GameScreenshot {
  id: number;
  image: string;
  width: number;
  height: number;
  is_deleted: boolean;
}

export interface FetchScreenshotsResponse {
  count: number;
  results: GameScreenshot[];
}
