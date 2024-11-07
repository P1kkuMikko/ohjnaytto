import "gridstack/dist/gridstack.min.css";
import { GridStack, GridStackNode, Utils } from "gridstack";
import { widgetElements } from "./widget/elements.js";

export const insert = [
  { x: 0, y: 0, w: 3, h: 8, locked: true, id: "calc", content: widgetElements.calc },
  { x: 3, y: 0, w: 3, h: 3, locked: true, id: "clock", noResize: true, content: widgetElements.clock },
  { x: 3, y: 0, w: 3, h: 7, locked: true, id: "weather", noResize: true, content: widgetElements.weather },
];

// prettier-ignore
export const children = [
  { w: 3, h: 4, id: "calc", content: widgetElements.calc },
  { w: 3, h: 4, id: "weather", noResize: true, content: widgetElements.weather },
  { w: 4, h: 2, content: "1" },
  { w: 4, h: 4, content: "2" },
  { w: 2, h: 2, minW: 2, content: "3" },
  { w: 2, h: 2, content: "4" },
  { w: 2, h: 2, content: "5" },
  { w: 2, h: 4, content: "6" },
  { w: 4, h: 2, content: "7" },
  { w: 2, h: 2, content: "8" },
  { w: 4, h: 2, content: "9" },
  { w: 2, h: 2, content: "10" },
  { w: 2, h: 2, content: "11" },
];

export function initializeGrid() {
  // NOTE: REAL apps would sanitize-html or DOMPurify before blinding setting innerHTML. see #2736
  GridStack.renderCB = (el, w) => {
    el.innerHTML = w.content;
  };

  GridStack.setupDragIn(".sidepanel>.grid-stack-item", undefined, insert);

  let grid = GridStack.init({
    float: true,
    cellHeight: "auto",
    animate: false,
    columnOpts: {
      breakpointForWindow: true,
      breakpoints: [
        { w: 700, c: 1 },
        { w: 850, c: 3 },
        { w: 950, c: 6 },
        { w: 1100, c: 8 },
      ],
    },
    acceptWidgets: true,
    removable: "#trash", // drag-out delete class
    children,
  });

  return grid;
}
