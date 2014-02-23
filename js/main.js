// enable highlight
//hljs.initHighlightingOnLoad();

var gos = document.getElementsByClassName('doc_go');

var nanobar = new Nanobar();

for (go in gos) {
	if (gos.hasOwnProperty( go ) && go !== 'length') {
		gos[go].addEventListener ("click", function( e ) {
			var donde = e.currentTarget.getAttribute('go');
			nanobar.go( donde );
		});
	}
}
setTimeout(function(){
	nanobar.go( 50 );
}, 1000);
