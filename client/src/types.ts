/**
 * Represents a single page item in the table of contents.
 */
export type TPage = {
  /**
   * The child pages of this page, if any.
   */
  pages?: string[];
  /**
   * The unique identifier of the page.
   */
  id: string;
  /**
   * The title of the page.
   */
  title: string;
  /**
   * The URL of the page, if applicable.
   */
  url?: string;
  /**
   * The list of anchor IDs associated with this page.
   */
  anchors?: string[];
  /**
   * The ID of the parent page, if any.
   */
  parentId?: string;
  /**
   * The level of the page in the table of contents hierarchy.
   */
  level: number;
  /**
   * The tab index of the page in the table of contents.
   */
  tabIndex: number;
};

/**
 * Represents a single anchor in a page.
 */
export type TAnchor = {
  /**
   * The unique identifier of the anchor.
   */
  id: string;
  /**
   * The title of the anchor.
   */
  title: string;
  /**
   * The URL of the page containing the anchor.
   */
  url: string;
  /**
   * The anchor link within the page.
   */
  anchor: string;
  /**
   * The level of the anchor in the page hierarchy.
   */
  level: number;
};

/**
 * Represents the response from the API for the table of contents data.
 */
export interface IApiResponse {
  /**
   * The entities object containing pages and anchors data.
   */
  entities: {
    /**
     * The pages object containing page data with page ID as keys.
     */
    pages: { [key: string]: TPage };
    /**
     * The anchors object containing anchor data with anchor ID as keys.
     */
    anchors: { [key: string]: TAnchor };
  };
  /**
   * The array of top-level page IDs for the table of contents.
   */
  topLevelIds: string[];
}
