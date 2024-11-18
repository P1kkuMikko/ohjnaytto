import * as bootstrap from "bootstrap";

let offcanvasEl: HTMLElement | null;
let offcanvas: bootstrap.Offcanvas | null;

export function initializeSidePanel(): void {
  offcanvasEl = document.querySelector("#offcanvasSP");
  offcanvas = offcanvasEl ? new bootstrap.Offcanvas(offcanvasEl) : null;
}

export function sidepanelHide(): void {
  if (offcanvas) {
    console.log("Hiding Sidebar");
    offcanvas.hide();
  }
}

export function updateSidebarWidgets(savedGrid) {
  const gridItems = savedGrid.map((item) => item.id);
  const sidepanelItems = document.querySelectorAll(".sidepanel-item");
  sidepanelItems.forEach((item: HTMLElement) => {
    gridItems.includes(item.getAttribute("gs-id")) ? (item.hidden = true) : (item.hidden = false);
  });
}
