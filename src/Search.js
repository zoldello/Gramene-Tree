import _ from "underscore";

export default class Search {
		getDescedents (array, condition)  {
		let result = [],
			self = this;

		if (!array || !array.length) {
			return [];
		}
		array.forEach(function (a) {
			if (!condition) {
				result.push(a);
			} else if (condition(a))  {
				result.push(a);
			}

			if (Array.isArray(a.children)) {
				result = result.concat(self.getDescedents(a.children));
			}
		});
		return result;
	}

	bindSearch(flattenTreeData) {
		let  self = this;

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
				let nodeIdPath = [],
					activeNode = searchResult;

				while (!!activeNode.parent) {
					nodeIdPath.push(activeNode.parent.name);
					activeNode = activeNode.parent;
				}

				nodeIdPath = nodeIdPath.reverse();
				searchResultsArea.insertAdjacentHTML("beforeend",  `<option value="${searchResult.name} (path: ${nodeIdPath.join(' ->')})"  data-search-id=${searchResult.id}>`);
		 }
		});
	}

	getMatchByName(searchText) {
	return 	_.filter(this.flattenData, function(d) {
 		return d.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) >= 0;
 	});
	}
}
