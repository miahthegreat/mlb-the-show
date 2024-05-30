// types/index.ts
export interface Captain {
  uuid: string;
  img: string;
  baked_img: string;
  sc_baked_img: string | null;
  name: string;
  display_position: string;
  team: string;
  ovr: number;
  ability_name: string;
  ability_desc: string;
  update_date: string;
  boosts: Boost[];
}

export interface Boost {
  tier: string;
  description: string;
  attributes: Attribute[];
}

export interface Attribute {
  name: string;
  value: string;
}

export interface Item {
  uuid: string;
  type: string;
  img: string;
  baked_img: string;
  sc_baked_img: string | null;
  name: string;
  rarity: string;
  team: string;
  team_short_name: string;
  ovr: number;
  series: string;
  series_texture_name: string;
  series_year: number;
  display_position: string;
  has_augment: boolean;
  augment_text: string | null;
  augment_end_date: string | null;
  has_matchup: boolean;
  stars: string | null;
  trend: string | null;
  new_rank: number;
  has_rank_change: boolean;
  event: boolean;
  set_name: string;
  is_live_set: boolean;
  ui_anim_index: number;
}

export type Pitch = {
  name: string;
  speed: number;
  control: number;
  movement: number;
};

export type Quirk = {
  name: string;
  description: string;
  img: string;
};

export type ItemDetail = {
  uuid: string;
  type: string;
  img: string | null;
  baked_img: string | null;
  sc_baked_img: string | null;
  name: string | null;
  rarity: string | null;
  team: string | null;
  team_short_name: string | null;
  ovr: number | null;
  series: string | null;
  series_texture_name: string | null;
  series_year: number | null;
  display_position: string | null;
  display_secondary_positions: string | null;
  jersey_number: string | null;
  age: number | null;
  bat_hand: string | null;
  throw_hand: string | null;
  weight: string | null;
  height: string | null;
  born: string | null;
  is_hitter: boolean | null;
  stamina: number | null;
  pitching_clutch: number | null;
  hits_per_bf: number | null;
  k_per_bf: number | null;
  bb_per_bf: number | null;
  hr_per_bf: number | null;
  pitch_velocity: number | null;
  pitch_control: number | null;
  pitch_movement: number | null;
  contact_left: number | null;
  contact_right: number | null;
  power_left: number | null;
  power_right: number | null;
  plate_vision: number | null;
  plate_discipline: number | null;
  batting_clutch: number | null;
  bunting_ability: number | null;
  drag_bunting_ability: number | null;
  hitting_durability: number | null;
  fielding_durability: number | null;
  fielding_ability: number | null;
  arm_strength: number | null;
  arm_accuracy: number | null;
  reaction_time: number | null;
  blocking: number | null;
  speed: number | null;
  baserunning_ability: number | null;
  baserunning_aggression: number | null;
  hit_rank_image: string | null;
  fielding_rank_image: string | null;
  pitches: Pitch[] | null;
  quirks: Quirk[] | null;
  is_sellable: boolean | null;
  has_augment: boolean | null;
  augment_text: string | null;
  augment_end_date: string | null;
  has_matchup: boolean | null;
  stars: number | null;
  trend: string | null;
  new_rank: number | null;
  has_rank_change: boolean | null;
  event: boolean | null;
  set_name: string | null;
  is_live_set: boolean | null;
  ui_anim_index: number | null;
};

export interface PriceHistoryEntry {
  date: string;
  best_buy_price: number;
  best_sell_price: number;
}

export interface CompletedOrder {
  date: string;
  price: string;
}

export type Listing = {
  listing_name: string;
  best_sell_price: number;
  best_buy_price: number;
  item: Item;
  price_history: PriceHistoryEntry[];
  completed_orders: CompletedOrder[];
}

export type ApiResponse = {
  page: number;
  per_page: number;
  total_pages: number;
  captains?: Captain[];
  items?: Item[];
  listings?: Listing[];
};

export interface StateContextType {
  captains: Captain[] | undefined;
  items: Item[];
  listings: Listing[];
  captainsPage: number;
  itemsPage: number;
  listingsPage: number;
  captainsTotalPages: number;
  itemsTotalPages: number;
  listingsTotalPages: number;
  itemType: string;
  error: string | null;
  fetchCaptains: (page: number) => void;
  fetchItems: (page: number, type: string) => void;
  fetchListings: (
    page: number,
    type: string,
    sort: string,
    order: string,
    rarity: string | undefined
  ) => void;
  handleNextPage: (type: "captains" | "items" | "listings") => void;
  handlePreviousPage: (type: "captains" | "items" | "listings") => void;
  setPage: (type: "captains" | "items" | "listings", page: number) => void;
  setItemType: (type: string) => void;
  setListingType: (type: string) => void;
  setSort: (sort: string) => void;
  setOrder: (order: string) => void;
  setRarity: (rarity: string | undefined) => void;
}
