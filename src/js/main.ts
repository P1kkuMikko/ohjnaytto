// Bootstrap
import "../scss/styles.scss";
import "gridstack/dist/gridstack.min.css";
import { initializeGrid } from "./gridstack";
import { initializeSidePanel } from "./sidepanel";
import { logicCalc } from "../js/widget/Widgets.js";
import { digiclock } from "./widget/digiclock/digiclock.js";

const grid = initializeGrid();
initializeSidePanel();
digiclock.init();

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

grid.on("added", (event: Event, el: GridStackNode[]) => {
  const id = el[0].id;
  switch (true) {
    case /clock/.test(id):
      console.log("clock added");
      // digiclock.init();
      break;

    default:
      break;
  }
});

document.querySelector(".grid-stack").addEventListener("click", widgetOnClick);
