import * as bootstrap from "bootstrap";

let offcanvasEl: HTMLElement | null;
let offcanvas: bootstrap.Offcanvas | null;

function initializeSidePanel(): void {
  offcanvasEl = document.querySelector("#offcanvasSP");
  offcanvas = offcanvasEl ? new bootstrap.Offcanvas(offcanvasEl) : null;
}


function sidepanelHide(): void {
  if (offcanvas) {
    console.log("Hiding Sidebar");
    offcanvas.hide();
  }
}

export { initializeSidePanel, sidepanelHide };
