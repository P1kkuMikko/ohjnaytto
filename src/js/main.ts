import "../scss/styles.scss";
import "gridstack/dist/src/gridstack.scss";
import { GridHTMLElement, GridStack, GridStackEngine, GridStackNode } from "gridstack";
import { initializeGrid } from "./gridstack";
import { initializeSidePanel } from "./sidepanel";
import { calc } from "../js/widget/calc/calc.js";
import { searchWeather } from "./widget/weather/weather.js";
import { DigiClock } from "./widget/digiclock/DigiClock.js";
import { Notes } from "./widget/notes/notes.js";
import { Timer } from "./widget/timer/timer.js";
import { CoinFlip } from "./widget/coinflip/Coinflip.js";

const widgetMap = new Map();
const grid = initializeGrid();
initializeSidePanel();

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
*/

// Helper function to get the grid item
function getGridItem(event: Event): HTMLElement | null {
  return (event.target as HTMLElement).closest(".grid-stack-item");
}

// Helper function to get the grid item ID
function getGridItemId(gridItem: HTMLElement): string {
  return gridItem.getAttribute("gs-id") || "";
}

// Strip everything else except letters from a string
function toLetters(str: String) {
  return str.replace(/[^a-zA-Z]+/g, "");
}

// Handle click and change events on grid
function handleGridEvent(event: Event, eventType: "click" | "change" | "input") {
  const gridItem = getGridItem(event);
  if (!gridItem) return;
  const id = getGridItemId(gridItem);
  if (!id) return;

  console.debug(`${event.type} on ${id}`);

  const widget = widgetMap.get(id);

  switch (toLetters(id)) {
    case "calc":
      if (eventType === "click") {
        calc.handleEvent(event, gridItem);
      }
      break;
    case "clock":
      if (eventType === "change") {
        widget.updateClock();
      }
      break;
    case "weather":
      if ((event.target as HTMLElement).classList.contains("get-weather")) {
        searchWeather();
      }
      break;
    case "notes":
    case "coinflip":
    case "timer":
      widget.handleEvent(event);
      break;
  }
}

function gridOnAddedRemoved(event: Event, items: GridStackNode[]) {
  const item = items[0]; // We should only have 1 item
  console.log(gridHasItem(item.id));

  if (event.type === "removed") {
    if (widgetMap.has(item.id)) widgetMap.delete(item.id);
    return;
  }

  switch (toLetters(item.id)) {
    case "clock":
      widgetMap.set(item.id, new DigiClock(item.el));
      break;
    case "notes":
      widgetMap.set(item.id, new Notes(item.el));
      break;
    case "coinflip":
      widgetMap.set(item.id, new CoinFlip(item.el));
      break;
    case "timer":
      widgetMap.set(item.id, new Timer(item.el));
      break;
  }
}

function initializeWidgetMap() {
  const arr = ["clock", "notes", "coinflip", "timer"];
  grid.engine.nodes.forEach((item) => {
    if (arr.indexOf(item.id) > -1) {
      if (item.id === "clock") {
        widgetMap.set(item.id, new DigiClock(item.el));
      } else if (item.id === "notes") {
        widgetMap.set(item.id, new Notes(item.el));
      } else if (item.id === "coinflip") {
        widgetMap.set(item.id, new CoinFlip(item.el));
      } else if (item.id === "timer") {
        widgetMap.set(item.id, new Timer(item.el));
      }
    }
  });
}

function gridHasItem(id) {
  // const gridItems = grid.getGridItems();
  // const currentItemIds = nodes.map((item) => item.id).filter((item) => item !== undefined);
  // console.log(currentItemIds.indexOf(id) > -1);
  // const items = [...document.querySelectorAll(".sidepanel-item")].map((item) => item["gridstackNode"].id);
  // console.log(items);
}

function toggleTrash(event: Event) {
  const element: HTMLButtonElement = document.querySelector("#trash");
  event.type === "dragstart" ? (element.hidden = false) : (element.hidden = true);
}

// Event listeners
grid.on("dragstart dragstop", toggleTrash);
grid.on("added removed", gridOnAddedRemoved);
document.addEventListener("DOMContentLoaded", initializeWidgetMap);
document.querySelector(".grid-stack")?.addEventListener("click", (event) => handleGridEvent(event, "click"));
document.querySelector(".grid-stack")?.addEventListener("change", (event) => handleGridEvent(event, "change"));
document.querySelector(".grid-stack")?.addEventListener("input", (event) => handleGridEvent(event, "input"));

// const test = grid.save();
// test.forEach((element) => {
//   console.log(element);
// });
