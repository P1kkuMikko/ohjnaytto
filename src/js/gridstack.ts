import "gridstack/dist/src/gridstack.scss";
import { GridStack, GridStackNode, Utils, Responsive } from "gridstack";
import { widgetElements } from "./widget/elements.js";

export const insert = [
  { w: 3, h: 8, id: "calc", content: widgetElements.calc },
  { w: 3, h: 3, id: "clock", content: widgetElements.clock },
  { w: 3, h: 3, id: "weather", content: widgetElements.weather },
  { w: 3, h: 3, id: "notes", content: widgetElements.notes },
];

// prettier-ignore
export const children = [
  { w: 1, h: 4, id: "calc", content: widgetElements.calc },
  { w: 1, h: 4, id: "weather", content: widgetElements.weather },
  { w: 1, h: 2, content: "1" },
  { w: 1, h: 4, content: "2" },
  { w: 1, h: 2, content: "3" },
  { w: 1, h: 2, content: "4" },
  { w: 1, h: 2, content: "5" },
  { w: 1, h: 4, content: "6" },
  { w: 1, h: 2, content: "7" },
  { w: 1, h: 2, content: "8" },
  { w: 1, h: 2, content: "9" },
  { w: 1, h: 2, content: "10" },
  { w: 1, h: 2, content: "11" },
];

export function initializeGrid() {
  // NOTE: REAL apps would sanitize-html or DOMPurify before blinding setting innerHTML. see #2736
  GridStack.renderCB = (el, w) => {
    el.innerHTML = w.content;
  };

  GridStack.setupDragIn(".sidepanel>.grid-stack-item", undefined, insert);

  let grid = GridStack.init({
    float: true,
    cellHeight: "10em",
    animate: false,
    // column: "auto",
    columnOpts: {
      breakpointForWindow: true,
      breakpoints: [
        { w: 450, c: 1 },
        { w: 900, c: 2 },
        { w: 1200, c: 3 },
        { w: 1600, c: 4 },
        { w: 2000, c: 5 },
      ],
    },
    acceptWidgets: true,
    removable: "#trash", // drag-out delete class
    children,
  });

  return grid;
}
