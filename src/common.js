module.exports = {
	changeHeader: (vm, obj) => {
		let parent = vm.$parent;
        parent.hasTitle = obj.hasTitle || false;
        parent.hasRefresh = obj.hasRefresh || false;
        parent.hasAdd = obj.hasAdd || false;
        parent.hasReturn = obj.hasReturn || false;
        parent.isContact = obj.isContact || false;
	}
}