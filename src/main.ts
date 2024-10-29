import "gridstack/dist/gridstack.css";
import { GridStack } from "gridstack";

// NOTE: REAL apps would sanitize-html or DOMPurify before blinding setting innerHTML. see #2736
GridStack.renderCB = function (el, w) {
  el.innerHTML = w.content;
};

let children = [
  { x: 0, y: 0, w: 4, h: 2, content: "1" },
  { x: 4, y: 0, w: 4, h: 4, locked: true, content: 'I can\'t be moved or dragged, nor pushed by others!<br><ion-icon name="ios-lock"></ion-icon>' },
  {
    x: 8,
    y: 0,
    w: 2,
    h: 2,
    minW: 2,
    noResize: true,
    content:
      '<p class="card-text text-center" style="margin-bottom: 0">Drag me!<p class="card-text text-center"style="margin-bottom: 0"><ion-icon name="hand"></ion-icon><p class="card-text text-center" style="margin-bottom: 0">...but don\'t resize me!',
  },
  { x: 10, y: 0, w: 2, h: 2, content: "4" },
  { x: 0, y: 2, w: 2, h: 2, content: "5" },
  { x: 2, y: 2, w: 2, h: 4, content: "6" },
  { x: 8, y: 2, w: 4, h: 2, content: "7" },
  { x: 0, y: 4, w: 2, h: 2, content: "8" },
  { x: 4, y: 4, w: 4, h: 2, content: "9" },
  { x: 8, y: 4, w: 2, h: 2, content: "10" },
  { x: 10, y: 4, w: 2, h: 2, content: "11" },
];
let insert = [{ h: 2, content: "new item" }];

let grid = GridStack.init({
  float: true,
  cellHeight: 70,
  acceptWidgets: true,
  removable: "#trash", // drag-out delete class
  children,
});
GridStack.setupDragIn(".sidepanel>.grid-stack-item", undefined, insert);

grid.on("added removed change", function (e, items) {
  let str = "";
  items.forEach(function (item) {
    str += " (x,y)=" + item.x + "," + item.y;
  });
  console.log(e.type + " " + items.length + " items:" + str);
});
