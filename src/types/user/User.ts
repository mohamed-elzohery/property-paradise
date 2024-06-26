export interface User {
  email: string;
  username: string;
  image?: string;
  bookmarks: string[];
  createdAt: Date;
  updatedAt: Date;
}
