// Event listener for DOMContentLoaded to initialize the notes functionality
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

    // Event listener for adding a new note
    addNoteButton.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText) {
            addNoteToList(noteText);
            noteInput.value = '';
            saveNotes();
        }
    });

    // Event listener for saving free text area content
    freeTextArea.addEventListener('input', () => {
        saveFreeText();
    });

    // Event listeners for text formatting buttons
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

    // Function to toggle the active state of formatting buttons
    function toggleButtonState(button) {
        button.classList.toggle('active');
    }

    // Function to add a note to the list
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

    // Function to save notes to localStorage
    function saveNotes() {
        const notes = [];
        document.querySelectorAll('.note-text').forEach(note => {
            notes.push(note.textContent);
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Function to load notes from localStorage
    function loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.forEach(noteText => {
            addNoteToList(noteText);
        });
    }

    // Function to save free text area content to localStorage
    function saveFreeText() {
        localStorage.setItem('freeText', freeTextArea.innerHTML);
    }

    // Function to load free text area content from localStorage
    function loadFreeText() {
        const savedFreeText = localStorage.getItem('freeText') || '';
        freeTextArea.innerHTML = savedFreeText;
    }
});
