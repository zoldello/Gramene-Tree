import d3 from "d3";
import _ from "underscore";
import Search from "./Search";
import dom from "./Dom";

export default class Tree {
	constructor(data) {
		this._data = data;
		this._tree =  null;
		this._flattenData = null;
		this.svg = null;
		this.search = new Search();
	}

	get data () {
		return this._data
	}

	get root() {
		return [this.data];
	}

	get flattenData() {
		if (!this._flattenData) {
			this._flattenData =  this.search.getDescedents(this.root);
		};
		return this._flattenData;
	}

	init() {
		this.buildTree();
	}

	isParent(d) {
		return !!d.children || !!d._children;
	}

	isNotParent(d) {
		return !d.children && !d._children;
	}

markWellAnnotated() {
	let wellAnnotated = [1, 3702, 39947, 4577];

	d3.selectAll('g.node').classed('well-annotated', function (d) {
		return  wellAnnotated.includes(d.id);
	});
}

	selectNode(children) {
		if (!children || children.length === 0) {
			return;
		}

		let  self = this,
			svg = d3.select("body").append("svg"),
			parentElement = document.querySelector(`[data-id="${children[0].parent.id}"]` ),
			isParentSelected = parentElement.classList.contains("js-isSelected");

			parentElement.classList[isParentSelected ? "remove" : "add"]('js-isSelected'); //toggle

		d3.selectAll('g.node').classed('selected-node', function(d, i) {
  		if( !d.children && !d._children && _.pluck(children, "id").indexOf(d.id)  >= 0) {
				return !isParentSelected;
			}
		})
	}

	buildTree() {
		let self = this,
			treeData = self.root,
			flattenTreeData =  self.flattenData; //self.search.getDescedents(treeData);

		document.getElementById("search-list").addEventListener("keyup", function(){
			let self= this,
			 	searchText =  self.value.trim(),
				searchResultsArea = document.querySelector("#searchResults");

			if (!searchText || searchText.length < 2) {
				return;
			}

			let searchResults = _.filter(flattenTreeData, function(d) {
				return d.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) >= 0;
			});

			searchResultsArea.innerHTML = "";
			for (let searchResult of searchResults) {
				searchResultsArea.insertAdjacentHTML("beforeend",  `<option value="${searchResult.name}" data-search-id=${searchResult.id}>`);
		 }
		});

		// ************** Generate the tree diagram	 *****************
		let margin = { top: 20, right: 120, 	bottom: 20,	left: 90 },
		width = 960 - margin.right - margin.left,
		height = 1000 - margin.top - margin.bottom,
		i = 0,
		duration = 750,
		root,
		tree = d3.layout.tree()
		.size([height, width]);

		var diagonal = d3.svg.diagonal()
		.projection(function(d) {
			return [d.y, d.x];
		}),
		svg = d3.select("#gramene-tree-area").append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		root = treeData[0];
		root.x0 = height / 2;
		root.y0 = 0;

		var treeDepth = d3.max(tree(root), function(d) {
			return d.depth;
		})

		update(root);
		d3.select(self.frameElement).style("height", "500px");

		function update(source) {
			// Compute the new tree layout.
			let nodes = tree.nodes(root).reverse(),
			links = tree.links(nodes);

			// Normalize for fixed-depth.
			nodes.forEach(function(d) {
				var depthSize = 50;
				if (!d.children) {
					d.depth = treeDepth;
				}
				d.y = d.depth * depthSize;
			});

			// Update the nodes…
			var node = svg.selectAll("g.node")
			.data(nodes, function(d) {
				return d.id || (d.id = ++i);
			});

			// Define the div for the tooltip
			var div = d3.select("body").append("div")
			.attr("class", "tooltip")
			.style("opacity", 0);

			// Enter any new nodes at the parent's previous position.
			var nodeEnter = node.enter().append("g")
			.attr("class", "node tooltip")
			.attr("data-id", function(d) {
				return d.id;
			})
			.attr("transform", function(d) {
				return "translate(" + (source.y0) + "," + source.x0 + ")";
			})
			.on("click", 	function(d) {
				if (d.children) {
					d._children = d.children;
					d.children = null;
				} else {
					d.children = d._children;
					d._children = null;
				}

				update(d);

				if (!self.isParent(d)) {
					let element = document.querySelector(`[data-id="${d.id}"]`),
						isSelected = element.classList.contains("selected-node");

						element.classList[isSelected ? "remove" : "add"]("selected-node"); // toggle highlight on element
				}

							})
			.on('dblclick', function (d) {
				let children;

				if (!self.isParent(d)) {
					return;
				}
				children = self.search.getDescedents(d.children || d._children,  self.isNotParent) ;

				let node = svg.selectAll("g.node")
				.data(nodes, function(d) {
					var i = 0;

					//return d.id || (d.id = ++i);
				});

				let nodeEnter = node.enter().append("g")
				.classed('selected-node', function(d) {
					var i = 0
				});

				self.selectNode(children);

				//alert('double click');

			})

			.on("mouseover", function(d) {
				if (!d.children) {
					return;
				}

				div.transition()
				.duration(200)
				.style("opacity", .9);
				div .html(d.name   )
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");

			})
			.on("mouseout", function(d) {
				div.transition()
				.duration(500)
				.style("opacity", 0);
			});

			nodeEnter.append("circle")
			.attr("r", 1e-6)
			.style("fill", function(d) {
				return d._children ? "lightsteelblue" : "#fff";
			});
			nodeEnter.append("text")
			.attr("x", function(d) {
				return d.children || d._children ? -13 : 13;
			})
			.attr("dy", ".35em")
			.attr("text-anchor", function(d) {
				return d.children || d._children ? "end" : "start";
			})
			.text(function(d) {
				//return d.name;
				return  !d.children && !d._children  ? d.name : ' ';
			})

			.style("font-weight", function(d) {
				return d.isWellAnnoted ? "bold" : "";
			})
			.style("background-color", function(d) {
				return !!d.backgroundColor ? d.backgroundColor : '';
			})

			.style("fill-opacity", 1e-6);
			// Transition nodes to their new position.
			var nodeUpdate = node.transition()
			.duration(duration)
			.attr("transform", function(d) {
				var dist = d.y;
				return "translate(" + dist + "," + d.x + ")";
			});
			nodeUpdate.select("circle")
			.attr("r", 10)
			.style("fill", function(d) {
				return d._children ? "lightsteelblue" : "#fff";
			});
			nodeUpdate.select("text")
			.style("fill-opacity", 1);

			// Transition exiting nodes to the parent's new position.
			let nodeExit = node.exit().transition()
			.duration(duration)
			.attr("transform", function(d) {
				return "translate(" + source.y + "," + source.x + ")";
			})
			.remove();
			nodeExit.select("circle")
			.attr("r", 1e-6);
			nodeExit.select("text")
			.style("fill-opacity", 1e-6);

			// Update the links…
			let link = svg.selectAll("path.link")
			.data(links, function(d) {
				return d.target.id;
			});

			// Enter any new links at the parent's previous position.
			link.enter().insert("path", "g")
			.attr("class", "link")
			.attr("d", function(d) {
				var o = {
					x: source.x0,
					y: source.y0
				};
				return diagonal({
					source: o,
					target: o
				});
			});

			// Transition links to their new position.
			link.transition()
			.duration(duration)
			.attr("d", diagonal);

			// Transition exiting nodes to the parent's new position.
			link.exit().transition()
			.duration(duration)
			.attr("d", function(d) {
				var o = {
					x: source.x,
					y: source.y
				};
				return diagonal({
					source: o,
					target: o
				});
			})
			.remove();

			// Stash the old positions for transition.
			nodes.forEach(function(d) {
				d.x0 = d.x;
				d.y0 = d.y;
			});
		} //update

					self.markWellAnnotated();
	}


}
