import * as bootstrap from "bootstrap";

let sidePanelButton: HTMLElement | null;
let offcanvasEl: HTMLElement | null;
let offcanvas: bootstrap.Offcanvas | null;
let sidepanel: HTMLElement | null;

function initializeSidePanel(): void {
  sidePanelButton = document.querySelector("#sptogglebtn");
  offcanvasEl = document.querySelector("#offcanvasSP");
  offcanvas = offcanvasEl ? new bootstrap.Offcanvas(offcanvasEl) : null;
  sidepanel = document.querySelector(".sidepanel");
  document.onmousedown = onMouseDown;
}

function onMouseDown(e: MouseEvent): void {
  console.log("onMouseDown");
  const closest = (e.target as HTMLElement).closest(".sidepanel-item");
  if (!closest) return;
  hide();
}

function hide(): void {
  if (offcanvas) {
    offcanvas.hide();
  }
}

export { initializeSidePanel };
