import 'gridstack/dist/gridstack.min.css'
import './style.css'
import { GridStack } from 'gridstack'

var grid = GridStack.init({
  cellHeight: "100px",
  float: true, 
  resizable: {
  handles: 'sw'
},
columnOpts: {
        breakpointForWindow: false,  // test window vs grid size
        breakpoints: [{w:700, c:1},{w:850, c:3},{w:950, c:6},{w:1100, c:8}]
      },
});
grid.addWidget({w: 2, content: 'item 1'});
grid.addWidget({w: 2, h:2, content: 'item 2'});
grid.addWidget({w: 2, content: 'item 3'});

