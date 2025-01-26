import { BaseQueryIndexProps } from "./utilsTypes";

export interface Book {
  id: number;
  name: string;
  author: string;
  price: number;
  bookImage: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string;
}

export interface BookQuery extends BaseQueryIndexProps {
  textSearch: string;
  minPrice: number;
  maxPrice: number;
}
