
export interface AuthorItem {
  id: number,
  username: string
}

export interface ProfileItem extends AccountItem {
  username: string
}

export interface UserItem {
  id: number,
  username: string
  email: string
  avatar_url: string
  created_at: string
  updated_at:string
}

export interface AvatatItem {
  avatar_url: string
}

export interface RecipeItem {
  id: number
  name: string
  description: string
  num_of_servings: number
  cook_time: number
  directions: string
  is_publish: boolean,
  author: AuthorItem,
  created_at: string,
  updated_at:string,
}


export interface RecipeListItem extends RecipeItem {
  is_publish: boolean
  created_at: string,
  updated_at: string
}

export interface PaginationItem {
  has_next: boolean,
  next_num: number | null,
  has_prev: boolean,
  prev_num: number | null,
  page: number,
  pages: number,
  per_page: number,
  total: number,
}


export interface RecipeListPaginationItem extends PaginationItem {
  data: Array<RecipeListItem>
}

export interface AccountItem {
  email: string,
  password: string
}

export interface TokenItem {
  access_token: string,
  refresh_token: string,
  token: string,
  status: string,
  hasRequestOnce: boolean
}

export interface RefreshItem {
  token: string
}

export interface MessageItem {
  message: string
}

export interface AlertItem {
  show: boolean,
  message: string,
  style: string
}