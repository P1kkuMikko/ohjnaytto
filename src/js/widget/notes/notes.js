export class Notes {
  constructor(el) {
    this.el = el;
    this.notesList = el.querySelector(".notes-list");
    this.noteInput = el.querySelector(".note-input");
    this.freeTextArea = el.querySelector(".free-text-area");
    this.loadNotes();
    this.loadFreeText();
  }

  handleEvent(e) {
    const classList = e.target.classList;
    if (!classList) return;

    switch (true) {
      case classList.contains("free-text-area"): // input
        this.saveFreeText();
        break;

      case classList.contains("add-note-button"): // click
        const noteText = this.noteInput.value.trim();
        if (noteText) {
          this.addNoteToList(noteText);
          this.noteInput.value = "";
          this.saveNotes();
        }
        break;

      case classList.contains("bold-button"): // click
        document.execCommand("bold");
        this.toggleButtonState(boldButton);
        break;

      case classList.contains("italic-button"): // click
        document.execCommand("italic");
        this.toggleButtonState(italicButton);
        break;

      case classList.contains("underline-button"): // click
        document.execCommand("underline");
        this.toggleButtonState(underlineButton);
        break;

      case classList.contains("delete-note"):
        const toRemove = e.target.closest(".note-item");
        this.notesList.removeChild(toRemove);
        this.saveNotes();
        break;
    }
  }

  toggleButtonState(button) {
    button.classList.toggle("active");
  }

  addNoteToList(noteText) {
    const noteItem = document.createElement("li");
    noteItem.className = "note-item";
    noteItem.innerHTML = `
              <span class="note-text">${noteText}</span>
              <button class="delete-note">Delete</button>
          `;
    this.notesList.appendChild(noteItem);
  }

  saveNotes() {
    const notes = [];
    this.el.querySelectorAll(".note-text").forEach((note) => {
      notes.push(note.textContent);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach((noteText) => {
      this.addNoteToList(noteText);
    });
  }

  saveFreeText() {
    localStorage.setItem("freeText", this.freeTextArea.innerHTML);
  }

  loadFreeText() {
    const savedFreeText = localStorage.getItem("freeText") || "";
    this.freeTextArea.innerHTML = savedFreeText;
  }
}
