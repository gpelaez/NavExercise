var MenuCtrl = function() {
	this.menuItems = [];
	this.mainContent = document.getElementById('main'); 
	this.menuButton = document.getElementById('toggle-menu');
	this.mainMenu = document.getElementById('main-menu-items');
	this.isOpen = false;
}
MenuCtrl.prototype = {
	init: function() {

		var _this = this;

		// Menu button click event
		this.menuButton.onclick = function() {
			document.body.classList.toggle("show-sidemenu");
			_this.isOpen = !_this.isOpen;
		}
		this.mainContent.onclick = function() {
			if(document.body.classList.contains("show-sidemenu")) {
				document.body.classList.remove("show-sidemenu");
			}
		}

		// Menu ajax request
		var url = "/api/nav.json";
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		        var obj = JSON.parse(xmlhttp.responseText);
		        var markup = _this.getNavItemsMarkup(obj);
		        _this.mainMenu.innerHTML += markup;
		    }
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();

	},
	getNavItemsMarkup: function(obj) {
	    var html = "";
	    for(var i = 0; i < obj.items.length; i++) {
	    	var item = obj.items[i]; 
	    	var hasSubnav = typeof item.items !== 'undefined' && item.items.length > 0;
	    	html += '<li class="' + (hasSubnav===true? 'has-submav':'')+'"><a href="'+item.url+'">' + item.label + '</a>';
	    	if (hasSubnav) {
	    		html += '<div class="chevron bottom"></div>'
	    		html += '<ul>';
	    		html += this.getNavItemsMarkup(item);
	    		html += '</ul>';
	    	}
	        html += '</li>';
	    }
	    return html;
	}
}

var menuInstance = new MenuCtrl();
menuInstance.init();



