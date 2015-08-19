var validation = (function () {

	var init = function() {
		_setUpListners();
	};

	var _setUpListners = function () {
		$('form').on('keydown', '.has-error', _removeError);
		$('form').on('reset', _clearForm);
	};

	var _removeError = function () {
		$(this).removeClass('has-error');
	};

	var _clearForm = function(form) {
		var form = $(this);
		form.find('.input, .textarea').trigger('hideTooltip');
		form.find('.has-error').removeClass('has-error');
	};

	//Создает тултипы
	var _createQtip = function (element, position) {

		if (position === 'right') {
			position = {
				my: 'left center',
				at: 'right center'
			}

		}else{
			position = {
				my: 'right center',
				at: 'left center',
				adjust: {
					method: 'shift none'
				}
			}
		}

		element.qtip({
			content: {
				text: function() {
					return $(this).attr('qtip-content');
				}
			},
			show: {
				event: 'show'
			},
			hide: {
				event: 'keydown hideTooltip'
			},
			position: position,
			style: {
				classes: 'qtip-mystyle qtip-rounded',
				tip: {
					height: 10, 
					width: 16
				}
			}
		}).trigger('show');


	};

	//Универсальная функция
	var validateForm = function(form){
		console.log('Привет я в модуле валидации, проверяю форму!')		

		var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
			valid = true;

		$.each(elements, function(index, val){
			var element = $(val),
				val = element.val(),
				pos = element.attr('qtip-position');

			if (val.length === 0) {
				element.addClass('has-error');
				_createQtip(element, pos);
				valid = false;
			}
			
		});

		return valid;
	};



	return {
		init: init,
		validateForm: validateForm
	};
})();

validation.init();
validation.validateForm();