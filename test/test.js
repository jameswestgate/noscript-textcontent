module('noscript tests');

test('simple contents', 2, function() {
	
	var fixture1 = document.getElementById('qunit-fixture1');
	var noscript = fixture1.getElementsByTagName('noscript')[0];
	var result = noscript.textContent;
	
	ok(result, 'Simple contents found');
	ok(result === '<p>test1</p>', 'Simple contents matched');
});

test('image contents', 2, function() {
	
	var fixture1 = document.getElementById('qunit-fixture2');
	var noscript = fixture1.getElementsByTagName('noscript')[0];
	var result = noscript.textContent;
	
	ok(result, 'Image contents found');
	ok(result === '<img src="http://www.google.co.uk/images/srpr/logo3w.png"/>', 'Simple contents matched');
});

test('whitespace contents', 2, function() {
	var fixture1 = document.getElementById('qunit-fixture3');
	var noscript = fixture1.getElementsByTagName('noscript')[0];
	var result = noscript.textContent;
	
	ok(result, 'Whitespace contents found');
	ok(result.indexOf('<p>test 3</p>') > -1, 'Whitespace contents matched');
})


