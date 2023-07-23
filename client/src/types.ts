export type TPage = {
  pages?: string[];
  id: string;
  title: string;
  url: string;
  anchors?: string[];
  parentId?: string;
  level: number;
  tabIndex: number;
};

export type TAnchor = {
  id: string;
  title: string;
  url: string;
  anchor: string;
  level: number;
};

export interface IApiResponse {
  entities: {
    pages: { [key: string]: TPage };
    anchors: { [key: string]: TAnchor };
  };
  topLevelIds: string[];
}
