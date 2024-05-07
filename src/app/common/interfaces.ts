
export interface Respuesta {

  href: string;
  items: any[];
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number

}




export interface Song {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: External_ids
  external_urls: External_urls
  href: string;
  id: String
  is_local: boolean
  name: string;
  popularity: number
  preview_url: string
  track_number: number
  type: number;
  uri: string;

}


export interface Album {

  album_type: string;
  artists: Artist[]
  available_markets: string[];
  external_urls: External_urls;
  href: string;
  id: string
  images: Imagenes[];
  name: string
  release_date: string;
  release_date_precision: string;
  total_tracks: number
  type: string;
  uri: string

}




export interface User {
  display_name: string
  external_urls: External_urls
  followers: Followers
  href: string
  id: string
  images : Imagenes
  type: string
  uri: string
}

export interface PlayList{
  collaborative: boolean
  description: string
  external_urls: External_urls
  href: string
  id: string
  images: Imagenes
  name: string
  owner: User
  primary_color: string
  public: boolean
  snapshot_id: string
  tracks : {href: string, total: number}
  type: string
  uri: string
}

export interface Item_playList {
  added_at: string
  added_by: {external_urls: External_urls, href: string, id: string, type: string, uri: string}
  is_local: boolean
  primary_color: string,
  track: Song
  video_thumbnail: {url: string}
}

export interface ArtistinAlbum {
  external_urls: External_urls;
  href: string;
  id: string
  name: string;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: External_urls;
  //followers: Followers
  genres: string[];
  href: string;
  id: string
  images: Imagenes[]
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface External_ids {
  isrc: string;
}

export interface External_urls {
  spotify: string;
}

export interface Imagenes {
  height: number
  url: string;
  width: number
}

export interface Followers{
  href: string
  total: number
}



