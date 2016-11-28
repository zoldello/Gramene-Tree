import  grameneTreesClient from 'gramene-trees-client';
//import  {asyncA} as  'asyncawait/async';
//import 'asyncawait/await';

export default class Service {
	constructor() {
	}

getTreeData(init) {
	let treeLoader = grameneTreesClient.promise;
		 treeLoader.get().then(function(taxonomy) {
			 init(taxonomy.model);
		 }).catch(function(error) {
			 console.error(`Error in getting data: ${error}`);
		 });
	}
}
