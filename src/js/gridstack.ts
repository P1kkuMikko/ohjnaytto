import "gridstack/dist/src/gridstack.scss";
import { GridStack } from "gridstack";
import { widgetElements } from "./widget/elements";
import { sidepanelHide } from "./sidepanel.js";

export const insert = [
  { h: 4, id: "calc", content: widgetElements.calc },
  { h: 2, id: "clock", content: widgetElements.clock },
  { h: 4, id: "weather", content: widgetElements.weather },
  { h: 4, id: "notes", content: widgetElements.notes },
  { h: 2, id: "coinflip", content: widgetElements.coinflip },
  { h: 2, id: "timer", content: widgetElements.timer },
];

// prettier-ignore
export const children = [
  // {h: 4, id: 'calc', content: widgetElements.calc, x: 0, y: 0},
  // {h: 4, id: 'weather', content: widgetElements.weather, x: 1, y: 0},
  // {h: 2, id: 'clock', content: widgetElements.clock, x: 2, y: 0},
  // {h: 4, id: 'notes', content: widgetElements.notes, x: 4, y: 0},
  // {h: 2, id: 'coinflip', content: widgetElements.coinflip, x: 2, y: 2},
  // { h: 2, id: "timer", content: widgetElements.timer, x:3, y:0 },
  // {h: 2, content: '7', x: 1, y: 4},
  // {h: 2, content: '8', x: 2, y: 4},
  // {h: 2, content: '9', x: 3, y: 4},
  // {h: 2, content: '3', x: 4, y: 4},
  // {h: 2, content: '11', x: 1, y: 6},
  // {h: 2, content: '5', x: 4, y: 6},
  // {h: 2, content: '10', x: 4, y: 8}
];

export function initializeGrid() {
  // NOTE: REAL apps would sanitize-html or DOMPurify before blinding setting innerHTML. see #2736
  GridStack.renderCB = (el, w) => {
    el.innerHTML = w.content;
  };

  GridStack.setupDragIn(".sidepanel>.grid-stack-item", { helper: myClone }, insert);

  let grid = GridStack.init({
    float: true,
    cellHeight: "10em",
    animate: false,
    columnOpts: {
      breakpointForWindow: false,
      breakpoints: [
        { w: 450, c: 1 },
        { w: 900, c: 2 },
        { w: 1200, c: 3 },
        { w: 1600, c: 4 },
        { w: 2000, c: 5 },
      ],
    },
    removable: "#trash", // drag-out delete class
    children,
  });

  grid.opts.acceptWidgets = gridContains;

  return grid;
}

function gridContains(el: Element, grid = GridStack.init()) {
  return GridStack.Utils.find(grid.engine.nodes, el.getAttribute("gs-id")) ? false : true;
}

function myClone(el) {
  if (el.hasAttribute("gs-id")) {
    const id = el.getAttribute("gs-id");
    console.log("Cloning:", id);
    sidepanelHide();
    return GridStack.Utils.createWidgetDivs(undefined, { w: 1, content: widgetElements[id] });
  }
}
