export type ApiResponse = {
  statusCode: number;
  message: string;
  data: any;
};

export type News = {
  id: string;
  title: string;
  slug: string;
  category?: string;
  thumbnail: string;
  description?: string;
};

export interface NewsDetail extends News {
  content: string;
  tags: Array<ITag>;
  relatedNews: {
    main: Omit<News, "category">;
    sub: Array<Omit<News, "description" | "category" | "thumbnail">>;
  };
}

export type PageConfig = {
  id: string;
  name: string;
  value: string;
};

export type ITag = {
  name: string;
  slug: string;
};
