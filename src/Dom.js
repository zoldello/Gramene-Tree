import Search from "./Search";

export default class Dom {
	constructor() {
	}

	bindSearch(flattenTreeData) {
		document.getElementById("tree-search").addEventListener("click", function(){
			let searchBox = document.getElementById("search-box");
			let  searchText =  searchBox.value.trim() ;

			if (!searchText) {
				return;
			}

			let searchResult = _.filter(flattenTreeData, function(d) {
				return d.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) >= 0;
			});

			alert(searchResult);
  	});
	}
}
