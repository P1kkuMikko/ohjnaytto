import "gridstack/dist/gridstack.css";
import { GridStack, GridStackNode } from "gridstack";
import { widget } from "./widget/test.js";
import { Calculator } from "./widget/Widgets.js";

const widgets = new Map();

// NOTE: REAL apps would sanitize-html or DOMPurify before blinding setting innerHTML. see #2736
GridStack.renderCB = (el, w) => {
  el.innerHTML = w.content;
};
//## - Gridstack - ##

let children = [
  { x: 3, y: 0, w: 4, h: 2, content: "1" },
  { x: 3, y: 0, w: 4, h: 4, locked: true, content: 'I can\'t be moved or dragged, nor pushed by others!<br><ion-icon name="lock-closed-outline"></ion-icon>' },
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
  { x: 0, y: 2, w: 2, h: 2, content: "5" },
  { x: 2, y: 2, w: 2, h: 4, content: "6" },
  { x: 8, y: 2, w: 4, h: 2, content: "7" },
  { x: 0, y: 4, w: 2, h: 2, content: "8" },
  { x: 3, y: 4, w: 4, h: 2, content: "9" },
  { x: 8, y: 4, w: 2, h: 2, content: "10" },
  { x: 10, y: 4, w: 2, h: 2, content: "11" },
];

// let insert = [{ h: 2, content: "new item" }];

let insert = [{ x: 0, y: 0, w: 3, h: 8, locked: true, id: "calc", content: widget.calc }];

let grid = GridStack.init({
  float: true,
  cellHeight: 70,
  acceptWidgets: true,
  removable: "#trash", // drag-out delete class
  children,
});

GridStack.setupDragIn(".sidepanel>.grid-stack-item", undefined, insert);

grid.on("added", (_: Event, item: GridStackNode[]) => {
  const id = item[0].id;
  console.log(id);
  switch (true) {
    case /calc/.test(id):
      widgets.set(id, new Calculator(id)); // Initialize the calculator & add it to Map
      console.log(widgets);
      break;
  }
});

grid.on("removed", (_: Event, item: GridStackNode[]) => {
  const id = item[0].id;
  switch (true) {
    case /calc/.test(id):
      widgets.get(id).destroy(); // Destroy Event Listeners
      widgets.delete(id); // Delete from Map
      console.log(widgets);
      break;
  }
});

// Debug logging
// grid.on("added removed change", (event: Event, items: GridStackNode[]) => {
//   let str = "";
//   items.forEach((item) => {
//     str += " (x,y)=" + item.x + "," + item.y;
//   });
//   console.log(event.type + " " + items.length + " items:" + str);
// });
