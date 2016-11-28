/*
References and Credit:
Tree structure: http://stackoverflow.com/a/38319388/178550
tooltip: http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
flatten a nested array: http://stackoverflow.com/a/35273005/178550
*/
import Service from './Service';
import Tree from './Tree';

{
	let model,
		service = new Service(),
		init = function(model) {
			let tree = new Tree(model);
			tree.init();
	 };

			service.getTreeData(init);
}
