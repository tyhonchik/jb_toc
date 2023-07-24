import { PropsWithChildren } from "react";

import { DataContext } from "@/containers/DataContext";
import { IApiResponse } from "@/types";

// Sample data for testing
const mockData: IApiResponse = {
  entities: {
    pages: {
      Getting_started: {
        pages: ["Accessibility", "Discover_IntelliJ_IDEA"],
        id: "Getting_started",
        anchors: ["Getting_started_anchor_1"],
        title: "Getting started",
        url: "getting-started.html",
        parentId: "ij",
        level: 0,
        tabIndex: 0,
      },
      Accessibility: {
        id: "Accessibility",
        title: "Accessibility",
        anchors: ["Accessibility_anchor_1", "Accessibility_anchor_2"],
        url: "accessibility.html",
        parentId: "Getting_started",
        level: 1,
        tabIndex: 0,
      },
      Discover_IntelliJ_IDEA: {
        pages: ["Guided_Tour_Around_the_User_Interface"],
        id: "Discover_IntelliJ_IDEA",
        anchors: ["Discover_IntelliJ_IDEA_anchor_1"],
        title: "IntelliJ IDEA overview",
        url: "discover-intellij-idea.html",
        parentId: "ij",
        level: 0,
        tabIndex: 1,
      },
      Configuring_Project_and_IDE_Settings: {
        pages: [
          "b2cfdb7c",
          "Configuring_Colors_and_Fonts",
          "mastering_keyboard_shortcuts",
          "Notifications",
          "Absolute_Path_Variables",
          "Sharing_Your_IDE_Settings",
          "Tuning_the_IDE",
        ],
        id: "Configuring_Project_and_IDE_Settings",
        title: "IDE configuration",
        url: "configuring-project-and-ide-settings.html",
        parentId: "ij",
        level: 0,
        tabIndex: 1,
      },
      b2cfdb7c: {
        pages: [
          "New_UI",
          "Tool_Windows",
          "Customize_actions__menus__and_toolbars",
          "User_interface_themes",
          "IDE_Viewing_Modes",
          "Setting_Background_Image",
          "Touch_Bar_Support",
          "Linux_native_menu",
        ],
        id: "b2cfdb7c",
        title: "IDE appearance",
        parentId: "Configuring_Project_and_IDE_Settings",
        level: 1,
        tabIndex: 0,
      },
      New_UI: {
        id: "New_UI",
        title: "New UI",
        url: "new-ui.html",
        parentId: "b2cfdb7c",
        level: 2,
        tabIndex: 0,
      },
      Tool_Windows: {
        pages: [
          "Manipulating_the_Tool_Windows",
          "Viewing_Modes",
          "Tool_window_layouts",
          "Speed_Search_in_the_Tool_Windows",
        ],
        id: "Tool_Windows",
        title: "Tool windows",
        url: "tool-windows.html",
        parentId: "b2cfdb7c",
        level: 2,
        tabIndex: 1,
      },
    },
    anchors: {
      Getting_started_anchor_1: {
        id: "Getting_started_anchor_1",
        title: "Introduction to Getting started",
        url: "getting-started.html",
        anchor: "#introduction",
        level: 1,
      },
      Accessibility_anchor_1: {
        id: "Accessibility_anchor_1",
        title: "Basics of Accessibility",
        url: "accessibility.html",
        anchor: "#basics1",
        level: 1,
      },
      Accessibility_anchor_2: {
        id: "Accessibility_anchor_2",
        title: "Basics of Accessibility",
        url: "accessibility.html",
        anchor: "#basics2",
        level: 1,
      },
      Discover_IntelliJ_IDEA_anchor_1: {
        id: "Discover_IntelliJ_IDEA_anchor_1",
        title: "Discovering IntelliJ IDEA",
        url: "discover-intellij-idea.html",
        anchor: "#discovering",
        level: 1,
      },
    },
  },
  topLevelIds: ["Getting_started", "Configuring_Project_and_IDE_Settings"],
};

export const MockDataContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }: PropsWithChildren) => (
  <DataContext.Provider
    value={{
      data: mockData,
      loading: false,
      fetchData: async () => undefined,
    }}
  >
    {children}
  </DataContext.Provider>
);
