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
	var single = false,
		bjApp = document.querySelector('#bj-app'),
		singleProject = bjApp.querySelector('#single-project'),
		allProject = bjApp.querySelector('#all-projects');
	
	bjApp.addEventListener("click", function(e) {
		if (e.target.matches('.project-panel,.project-panel *')) {
			var panel = e.target.closest('.project-panel'),
				img = panel.querySelector('img'),
				imgSrc = img.src;
			e.stopPropagation();
			singleProject.querySelector('#single-project-image').src = imgSrc;
			console.log('imgSrc:',imgSrc,'\nimg:',img,'\npanel:',panel,'\ne.target:',e.target);
		}
		bjApp.classList.remove('single', 'all');
		bjApp.classList.add(single ? 'all' : 'single');
		single = !single;
	});
})();