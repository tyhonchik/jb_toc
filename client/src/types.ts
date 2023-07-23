export type TPage = {
  pages?: string[];
  id: string;
  title: string;
  url: string;
  parentId?: string;
  level: number;
  tabIndex: number;
};

export interface IApiResponse {
  entities: {
    pages: { [key: string]: TPage };
  };
  topLevelIds: string[];
}
