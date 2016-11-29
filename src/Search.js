import _ from "underscore";

export default class Search {
	constructor(flattenData) {
			this.flattenData = flattenData;
	}

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

	getMatchByName(searchText) {
	return 	_.filter(this.flattenData, function(d) {
 		return d.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) >= 0;
 	});
	}
}
