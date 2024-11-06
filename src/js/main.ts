// Bootstrap
import "../scss/styles.scss";

// Gridstack
import "gridstack/dist/gridstack.min.css";
import { GridStack, Utils } from "gridstack";

// Modules
import { SidePanel } from "./modules/SidePanel.mjs";
import { logicCalc } from "../js/widget/Widgets.js";
import { clock } from "../js/widget/clock/clockNew.js";
import { widgetElements } from "../js/widget/elements.js";

let insert = [{ x: 0, y: 0, w: 3, h: 5, locked: true, id: "calc", content: widgetElements.clock }];
let children = [
  { x: 0, y: 0, w: 3, h: 8, locked: true, id: "calc", content: widgetElements.calc },
  { x: 3, y: 0, w: 3, h: 5, locked: true, id: "clock", noResize: true, content: widgetElements.clock },
  { x: 8, y: 10, w: 4, h: 2, content: "1" },
  { x: 0, y: 8, w: 4, h: 4, locked: true, content: 'I can\'t be moved or dragged, nor pushed by others!<br><ion-icon name="lock-closed-outline"></ion-icon>' },
  {
    x: 8,
    y: 0,
    w: 2,
    h: 2,
    minW: 2,
    noResize: true,
    content:
      '<p class="card-text text-center" style="margin-bottom: 0">Drag me!<p class="card-text text-center"style="margin-bottom: 0"><ion-icon name="hand-right-outline"></ion-icon><p class="card-text text-center" style="margin-bottom: 0">...but don\'t resize me!',
  },
  { x: 10, y: 0, w: 2, h: 2, content: "4" },
  { x: 10, y: 6, w: 2, h: 2, content: "5" },
  { x: 8, y: 6, w: 2, h: 4, content: "6" },
  { x: 8, y: 2, w: 4, h: 2, content: "7" },
  { x: 10, y: 8, w: 2, h: 2, content: "8" },
  { x: 4, y: 10, w: 4, h: 2, content: "9" },
  { x: 8, y: 4, w: 2, h: 2, content: "10" },
  { x: 10, y: 4, w: 2, h: 2, content: "11" },
];

const sidepanel = new SidePanel();

// ## Gridstack Init

// NOTE: REAL apps would sanitize-html or DOMPurify before blinding setting innerHTML. see #2736
GridStack.renderCB = (el, w) => {
  el.innerHTML = w.content;
};

GridStack.setupDragIn(".sidepanel>.grid-stack-item", undefined, insert);

let grid = GridStack.init({
  float: true,
  cellHeight: 70,
  acceptWidgets: true,
  removable: "#trash", // drag-out delete class
  children,
});

function widgetOnClick(event: Event) {
  const gridItem = (event.target as HTMLElement).closest(".grid-stack-item");
  if (!gridItem) return;

  // console.group(event.type);
  // console.log("event.target:", event.target);
  // console.log("gridItem:", gridItem);
  // console.groupEnd();

  const id = gridItem.getAttribute("gs-id") || "";
  if (!id) return;

  switch (true) {
    case /calc/.test(id):
      logicCalc.handleEvent(event, gridItem);
      break;
    case /clock/.test(id):
      console.log("todo");
      break;
  }
}

clock.init();
setInterval(clock.update, 1000);

document.querySelector(".grid-stack").addEventListener("click", widgetOnClick);
