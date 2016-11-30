# Gramene Tree

This is an implementation a tree that runs off Gramene Tree data [http://gramene.org].


Author
---------------------------------------------
Phil

Requirements
---------------------------------------------------------------------
- Operating System: Linux, Windows or MacOs

- node.js 6.2.2 or higher. Linux, Windows or MacOs.

- npm 3.10.2 higher

- IE 10+, Edge, Chrome, Opera and FireFox.

For browsers, IE versions lowers than 10 and Safari may work for the most part. However, the typeahead is not supported in IE 9 and lower and Safari. It is recommended you use a supported browser.  

For other applications, earlier version of the required applications may work. However, they are guaranteed and an upgrade is recommended.


How to Setup local Environment
-----------------------------------------------------

-  Download or clone the code

-  Fetch dependencies by running:

```
npm install
```


How to Run
-----------------------------------------------------
- Open up the folder location in a console

- Run webpack
```
webpack
```

- Open up tree.html

- You will see the tree in the page


Features
-----------------------------------------------------
- Collapse or expand internal nodes by clicking on a non-leaf nodes

- Display internal node name by hovering over a node

- Select all leaf nodes of an internal node by double clicking the internal node (if the internal node was not previously selected.) The leaf nodes will turn red

- Unselect all leaf nodes of an intenral node by double clicking the internal node (if internal node was not previously selected.) The leaf nodes will become clear.

- Select a specific leaf node by clicking on it (if the leaf node is unselected). The leaf node will become red

- Unselect a specific leaf node by clicking on it (if the leaf node is selected.) The leaf node will clear out.

- Search by name by typing in the search box.

- well Annotated models are in bold. It is only visible if it is a leaf node.


Further Work (Also see issues-listing)
-----------------------------------------------------
Here are ideas I am pondering for future releases

- Some of the leaf-nodes' text are mingled together (bug)

- UNIT TEST and BDD TEST. I ought to have done TDD (technical debt)

- Mobile support like touch and double tap (features)

- The buildTree function in Tree.js is too complex and unit testing is tricky (technical debt)

- Hide or show childen nodes via CSS rather than deleting or re-adding children, respectively (technical debt)

-   Highlight specific subtrees with a color (feature)

- Make the spacing between leaf nodes even  (feature)

- Make all paths straights rather than curvy as they are now  (feature)
