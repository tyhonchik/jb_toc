import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { TableOfContents } from "@/components/TableOfContents";

import { MockDataContextProvider } from "./MockDataContextProvider";

describe("TableOfContents", () => {
  test("renders tree nodes with correct titles", () => {
    render(
      <BrowserRouter>
        <MockDataContextProvider>
          <TableOfContents />
        </MockDataContextProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("Getting started")).toBeInTheDocument();
    expect(screen.queryByText("Accessibility")).not.toBeInTheDocument();
    expect(screen.getByText("IDE configuration")).toBeInTheDocument();
  });

  test("clicking on a tree node navigates to the correct page", () => {
    render(
      <BrowserRouter>
        <MockDataContextProvider>
          <TableOfContents />
        </MockDataContextProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Getting started"));
    expect(window.location.pathname).toBe("/Getting_started");
  });

  test("expanding and collapsing tree nodes works correctly", () => {
    render(
      <BrowserRouter>
        <MockDataContextProvider>
          <TableOfContents />
        </MockDataContextProvider>
      </BrowserRouter>
    );

    expect(screen.queryByText("Accessibility")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("treeitem", { name: "Getting started" }));
    expect(screen.getByText("Accessibility")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("treeitem", { name: "Getting started" }));
    expect(screen.queryByText("Accessibility")).not.toBeInTheDocument();
  });

  test("rendering of anchors when a tree node is selected", () => {
    window.history.pushState({}, "Main Page", "/");

    render(
      <BrowserRouter>
        <MockDataContextProvider>
          <Routes>
            <Route path="/" element={<TableOfContents />} />
            <Route path="/:pageId" element={<TableOfContents />} />
          </Routes>
        </MockDataContextProvider>
      </BrowserRouter>
    );

    expect(
      screen.queryByText("Introduction to Getting started")
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Getting started"));

    expect(
      screen.getByText("Introduction to Getting started")
    ).toBeInTheDocument();
  });
});
