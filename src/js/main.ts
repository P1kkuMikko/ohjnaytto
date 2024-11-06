// Bootstrap
import "../scss/styles.scss";
import "gridstack/dist/gridstack.min.css";
import { initializeGrid } from "./gridstack";
import { initializeSidePanel } from "./sidepanel";
import { logicCalc } from "../js/widget/Widgets.js";
import { clock } from "../js/widget/clock/clockNew.js";

const grid = initializeGrid();
initializeSidePanel();

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
