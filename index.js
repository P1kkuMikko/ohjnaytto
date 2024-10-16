// get all draggie elements
const draggableElems = document.querySelectorAll('.grid-item');
// array of Draggabillies
const draggies = [];
// init Draggabillies
for (let i = 0; i < draggableElems.length; i++) {
	const draggableElem = draggableElems[i];
	const draggie = new Draggabilly(draggableElem, {
		grid: [200, 200],
		containment: '.grid',
	});
	draggies.push(draggie);
}
