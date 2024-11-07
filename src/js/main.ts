// Bootstrap
import "../scss/styles.scss";
import "gridstack/dist/gridstack.min.css";
import { GridStack, GridStackNode } from "gridstack";
import { initializeGrid } from "./gridstack";
import { initializeSidePanel } from "./sidepanel";
import { calc } from "../js/widget/calc/calc.js";
import { searchWeather } from "./widget/weather/weather.js";
import { DigiClock } from "./widget/digiclock/DigiClock.js";

const widgetMap = new Map();
const grid = initializeGrid();
initializeSidePanel();

// Helper function to get the grid item
function getGridItem(event: Event): HTMLElement | null {
  return (event.target as HTMLElement).closest(".grid-stack-item");
}

// Helper function to get the grid item ID
function getGridItemId(gridItem: HTMLElement): string {
  return gridItem.getAttribute("gs-id") || "";
}

// Handle click and change events on grid
function handleGridEvent(event: Event, eventType: "click" | "change") {
  const gridItem = getGridItem(event);
  if (!gridItem) return;

  const id = getGridItemId(gridItem);
  if (!id) return;

  console.log(`${event.type} on ${id}`);

  const widget = widgetMap.get(id);

  if (/calc/.test(id)) {
    if (eventType === "click") {
      calc.handleEvent(event, gridItem);
    }
  } else if (/clock/.test(id)) {
    if (eventType === "change") {
      widget.updateClock();
    }
  } else if (/weather/.test(id)) {
    if (eventType === "click" && (event.target as HTMLElement).classList.contains("get-weather")) {
      searchWeather();
    }
  }
}

grid.on("added", (event: Event, items: GridStackNode[]) => {
  // Todo add remove
  // We should only have 1 item
  const item = items[0];
  console.log(item);
  switch (true) {
    case /clock/.test(item.id):
      console.log("clock added");
      widgetMap.set(item.id, new DigiClock(item.el));
      break;

    default:
      break;
  }
});

// Event listeners
document.querySelector(".grid-stack")?.addEventListener("click", (event) => handleGridEvent(event, "click"));
document.querySelector(".grid-stack")?.addEventListener("change", (event) => handleGridEvent(event, "change"));
