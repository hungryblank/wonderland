function originalBindings(state) {
	
	$(state.currentBinding).each(function(i, binding) {
		binding();
	});
	state.currentBinding = [];
	return state;
};

function traverse(key, jsonObj, func) {
    if( typeof jsonObj == "object" ){
	    $.each(jsonObj, function(k,v) {
          traverse(k,v, func);
			})
		} else {
			func(key,jsonObj);
    }
};

function listify(obj, func) {
	var outList = "<ul>";
	$(obj).each(function(i, ele){
		var o = func(ele);
		if (o != null) {
			outList += "<li>"+o+"</li>";
		};		
	});
	outList += "</ul>";
	return outList;
};