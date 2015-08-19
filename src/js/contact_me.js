var contactMe = (function () {

	var init = function () {
		_setUpListners();
	};

	var _setUpListners = function () {
		$('#contact-me').on('submit', _submitForm);
	};

	var _submitForm = function(ev){
		console.log('Отправка формы');
		ev.preventDefault();

		var form = $(this),
			url = 'contactme.php',
			defObj = _ajaxForm(form, url);
	};

	var _ajaxForm = function (form, url) {
		console.log('ajax запрос, но с проверкой');
		if (!validation.validateForm(form)) return false;
	};

	return {
		init: init
	};
})();

contactMe.init();