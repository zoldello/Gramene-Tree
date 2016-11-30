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
