function tocGetText(e) {
	"use strict";
	var text = "", x;
	for (x = e.firstChild; x !== null; x = x.nextSibling) {
		if (x.nodeType === x.TEXT_NODE) {
			text += x.data;
		} else if (x.nodeType === x.ELEMENT_NODE) {
			text += tocGetText(x);
		}
	}
	return text;
}

function tocMake() {
	"use strict";
	var menu = document.createElement("ol");
	var children = document.body.childNodes;
	var chapter;
	var chapterId;
	var submenu;
	for (var i = 0; i < children.length; i++) {
		if (children[i].nodeType == 1) {
			switch(children[i].nodeName)
			{
			case "H1":
				var content = tocGetText(children[i]);
				chapterId = encodeURIComponent(content.toLowerCase()).replace(/%20/g,'.');
				children[i].setAttribute("id", chapterId);
				var link = document.createElement("a");
				link.setAttribute("href", "#" + chapterId);
				var language = children[i].getAttribute("lang")
				if (language !== null && language !== undefined)
					link.setAttribute("lang", language);
				link.innerHTML = children[i].innerHTML;
				chapter = document.createElement("li");
				chapter.appendChild(link);
				menu.appendChild(chapter);
				submenu = null;
				break;
			case "H2":
				var content = tocGetText(children[i]);
				var id = chapterId + "_" + encodeURIComponent(content.toLowerCase()).replace(/%20/g,'.');
				children[i].setAttribute("id", id);
				var link = document.createElement("a");
				link.setAttribute("href", "#" + id);
				var language = children[i].getAttribute("lang")
				if (language !== null && language !== undefined)
					link.setAttribute("lang", language);
				link.innerHTML = children[i].innerHTML;
				var section = document.createElement("li");
				section.appendChild(link);
				if (submenu === null) {
				  submenu = document.createElement("ol");
				  chapter.appendChild(submenu);   
				}
				submenu.appendChild(section);
				break;
			}
		}
	}
	var nav = document.createElement("nav");
	var title = document.createElement("h1");
	title.appendChild(document.createTextNode(""));
	nav.appendChild(title);
	nav.appendChild(menu);
	var header = document.getElementsByTagName("header")[0];
	if (document.getElementById("abstract") != null) {
		header.parentNode.insertBefore(nav, document.getElementById("abstract").nextSibling);	
	} else {
		header.parentNode.insertBefore(nav, header.nextSibling);
	}
}
window.onload = tocMake;
