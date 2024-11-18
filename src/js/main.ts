import "../scss/styles.scss";
import "gridstack/dist/src/gridstack.scss";
import { GridStackNode } from "gridstack";
import { initializeGrid } from "./gridstack";
import { initializeSidePanel, updateAvailableWidgets, updateSidebarWidgets } from "./sidepanel";
import { calc } from "../js/widget/calc/calc.js";
import { loadLastCity, searchWeather } from "./widget/weather/weather";
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

  console.log(`${event.type} @ ${id}`);

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
  const arr = { coinflip: CoinFlip, clock: DigiClock, notes: Notes, timer: Timer };

  for (let index = 0; index < items.length; index++) {
    const item = items[index];

    if (event.type === "removed") {
      if (widgetMap.has(item.id)) widgetMap.delete(item.id);
      continue;
    }

    if (event.type !== "added") continue;
    if (Object.keys(arr).includes(item.id)) widgetMap.set(item.id, new arr[item.id](item.el));
    else if (item.id === "weather") loadLastCity(); // HACKY
  }

  const savedGrid = grid.save();
  localStorage.setItem("gridNodes", JSON.stringify(savedGrid));
  updateSidebarWidgets(savedGrid);
}

function loadSavedGrid() {
  const savedGrid = JSON.parse(localStorage.getItem("gridNodes"));
  if (savedGrid) grid.load(savedGrid);
}

function toggleTrash(event: Event) {
  const element: HTMLButtonElement = document.querySelector("#trash");
  event.type === "dragstart" ? (element.hidden = false) : (element.hidden = true);
}

// Event listeners
grid.on("dragstart dragstop", toggleTrash);
grid.on("added removed change", gridOnAddedRemoved);
document.addEventListener("DOMContentLoaded", loadSavedGrid);
document.querySelector(".grid-stack")?.addEventListener("click", (event) => handleGridEvent(event, "click"));
document.querySelector(".grid-stack")?.addEventListener("change", (event) => handleGridEvent(event, "change"));
document.querySelector(".grid-stack")?.addEventListener("input", (event) => handleGridEvent(event, "input"));
