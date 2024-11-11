// Bootstrap
import "../scss/styles.scss";
import "gridstack/dist/src/gridstack.scss";
import { GridStack, GridStackNode } from "gridstack";
import { initializeGrid } from "./gridstack";
import { initializeSidePanel } from "./sidepanel";
import { calc } from "../js/widget/calc/calc.js";
import { searchWeather } from "./widget/weather/weather.js";
import { DigiClock } from "./widget/digiclock/DigiClock.js";
import { Notes } from "./widget/notes/notes.js";
import { CoinFlip } from "./widget/coinflip/Coinflip.js";

/* TODO:
  Calc
    * Classify ?
  Clock
    * Make a single SetInterval which ticks all the clocks at once
  Weather
    * Make multiple weather widgets work
    * Classify ?
  Notes
    * Split Notes and Freetext to their own widgets ?
    * Allow only single of type OR modify localStorage to support multiple widgets
  Coinflip
    * Allow only single of type OR modify localStorage to support multiple widgets
*/

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
function handleGridEvent(event: Event, eventType: "click" | "change" | "input") {
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
  } else if (/notes/.test(id)) {
    widget.handleEvent(event);
  } else if (/coinflip/.test(id)) {
    widget.handleEvent(event);
  }
}

grid.on("added", (event: Event, items: GridStackNode[]) => {
  // Todo add remove
  // We should only have 1 item
  const item = items[0];
  console.log(item);
  switch (true) {
    case /clock/.test(item.id):
      console.log(`${item.id} added`);
      widgetMap.set(item.id, new DigiClock(item.el));
      break;
    case /notes/.test(item.id):
      console.log(`${item.id} added`);
      widgetMap.set(item.id, new Notes(item.el));
      break;
    case /coinflip/.test(item.id):
      console.log(`${item.id} added`);
      widgetMap.set(item.id, new CoinFlip(item.el));
      break;
    default:
      break;
  }
});

// Event listeners
document.querySelector(".grid-stack")?.addEventListener("click", (event) => handleGridEvent(event, "click"));
document.querySelector(".grid-stack")?.addEventListener("change", (event) => handleGridEvent(event, "change"));
document.querySelector(".grid-stack")?.addEventListener("input", (event) => handleGridEvent(event, "input"));

document.addEventListener("DOMContentLoaded", () => {
  const arr = ["clock", "notes", "coinflip"];
  grid.engine.nodes.forEach((item) => {
    if (arr.indexOf(item.id) > -1) {
      if (item.id === "clock") {
        widgetMap.set(item.id, new DigiClock(item.el));
      } else if (item.id === "notes") {
        widgetMap.set(item.id, new Notes(item.el));
      } else if (item.id === "coinflip") {
        widgetMap.set(item.id, new CoinFlip(item.el));
      }
    }
  });
});

// const test = grid.save();
// test.forEach((element) => {
//   console.log(element);
// });
