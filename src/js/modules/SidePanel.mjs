import * as bootstrap from "bootstrap";
export { SidePanel };

class SidePanel {
  constructor() {
    this.sidePanelButton = document.querySelector("#sptogglebtn");
    this.offcanvasEl = document.querySelector("#offcanvasSP");
    this.offcanvas = new bootstrap.Offcanvas(this.offcanvasEl);
    this.sidepanel = document.querySelector(".sidepanel");
    document.onmousedown = this.onMouseDown.bind(this);
  }
  onMouseDown(e) {
    console.log("onMouseDown");
    const closest = e.target.closest(".sidepanel-item");
    if (!closest) return;
    this.hide();
  }
  hide() {
    this.offcanvas.hide();
  }
}
