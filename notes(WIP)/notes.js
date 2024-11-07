document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notes-list');
    const noteInput = document.getElementById('note-input');
    const addNoteButton = document.getElementById('add-note-button');
    const freeTextArea = document.getElementById('free-text-area');
    const boldButton = document.getElementById('bold-button');
    const italicButton = document.getElementById('italic-button');
    const underlineButton = document.getElementById('underline-button');

    loadNotes();
    loadFreeText();

    addNoteButton.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText) {
            addNoteToList(noteText);
            noteInput.value = '';
            saveNotes();
        }
    });

    freeTextArea.addEventListener('input', () => {
        saveFreeText();
    });

    boldButton.addEventListener('click', () => {
        document.execCommand('bold');
        toggleButtonState(boldButton);
    });

    italicButton.addEventListener('click', () => {
        document.execCommand('italic');
        toggleButtonState(italicButton);
    });

    underlineButton.addEventListener('click', () => {
        document.execCommand('underline');
        toggleButtonState(underlineButton);
    });

    function toggleButtonState(button) {
        button.classList.toggle('active');
    }

    function addNoteToList(noteText) {
        const noteItem = document.createElement('li');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `
            <span class="note-text">${noteText}</span>
            <button class="delete-note">Delete</button>
        `;
        notesList.appendChild(noteItem);

        noteItem.querySelector('.delete-note').addEventListener('click', () => {
            notesList.removeChild(noteItem);
            saveNotes();
        });
    }

    function saveNotes() {
        const notes = [];
        document.querySelectorAll('.note-text').forEach(note => {
            notes.push(note.textContent);
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.forEach(noteText => {
            addNoteToList(noteText);
        });
    }

    function saveFreeText() {
        localStorage.setItem('freeText', freeTextArea.innerHTML);
    }

    function loadFreeText() {
        const savedFreeText = localStorage.getItem('freeText') || '';
        freeTextArea.innerHTML = savedFreeText;
    }
});
