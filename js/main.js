if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = 
    function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement)); 
        return el;
    };
}

(function() {
	var nextTick = (function(window, prefixes, i, p, fnc) {
	    while (!fnc && i < prefixes.length) { fnc = window[prefixes[i++] + 'equestAnimationFrame']; }
	    return (fnc && fnc.bind(window)) || window.setImmediate || function(fnc) {window.setTimeout(fnc, 0);};
	})(window, 'r webkitR mozR msR oR'.split(' '), 0);
	
	var single = false,
		bjApp = document.querySelector('#bj-app'),
		singleProject = bjApp.querySelector('#single-project'),
		allProject = bjApp.querySelector('#all-projects'),
		breakpoint = 768;

	function toggleMode(showSingle) {
		nextTick(function() {
			single = typeof showSingle !== undefined ? showSingle : !single;
			bjApp.classList.remove('single', 'all');
			bjApp.classList.add( single ? 'single' : 'all');
			if (single) {
				singleProject.scrollTop = 0;
			}
		});
	}
	function setContent(imgSrc, descHTML) {
		nextTick(function() {
			singleProject.querySelector('#single-project-image').src = imgSrc;
			singleProject.querySelector('#single-project-desc').appendChild(descHTML);
			toggleMode(true);
			//console.log('imgSrc:',imgSrc,'\nimg:',img,'\npanel:',panel,'\ne.target:',e.target);
		});
	}
	bjApp.querySelector('#email-link').addEventListener('click', function(e) {

	})
	bjApp.querySelector('#resume-link').addEventListener('click', function(e) {
		
	})

	bjApp.addEventListener("click", function(e) {
		if (e.target.matches('.project-panel,.project-panel *')) {
			var panel = e.target.closest('.project-panel'),
				img = panel.querySelector('img'),
				imgSrc = img.src,
				desc = panel.querySelector('.desc'),
				descHTML = desc.cloneNode(true);
			e.stopPropagation();
			singleProject.querySelector('#single-project-image').src = '';
			singleProject.querySelector('#single-project-desc').innerHTML = '';
			setContent(imgSrc, descHTML);
		} else if (single) {
			toggleMode(false);
		}
		
	});
})();