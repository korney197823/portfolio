var myModule = (function (){

	var init = function () {
		_setUpListners();
		};
	var _setUpListners = function () {
		$('#add-new-item').on('click', _showModal ); // открыть модальное окно
		$('#addnewproject').on('submit', _addProject); // добавление проекта


		};

	var _showModal = function (ev) {
			console.log("Вызов модального окна");

			ev.preventDefault();

			var divPopup = $('#new_project_popup'),
				form = divPopup.find('.form');
			

			divPopup.bPopup({
				speed: 650,
				transition: 'slideDown',
				onClose: function () {
					form.find('.server_mes').text('').hide();
					form.trigger('reset');
				}

			});
		};

	var _addProject = function (ev) {
			console.log("Добавление проекта");
			ev.preventDefault();

			var form = $(this),
				url = 'add_project.php',
				defObj = _ajaxForm(form, url);
				
			if (defObj) {
					defObj.done(function(ans) {
					console.log(ans);
					var succesBox = form.find('.succes_mes'),
						errorBox = form.find('.error_mes');
					if(ans.status === 'OK'){
						console.log(ans.text);
						errorBox.hide();
						succesBox.text(ans.text).show();
					}else{
						console.log(ans.text);
						succesBox.hide();
						errorBox.text(ans.text).show();
					}

				});
			
			}
				
		};

	var _ajaxForm = function (form, url) {

		// 1. проверить форму
		// 2. собрать данные из формы
		// 3. вернуть ответ с сервера
		if (!validation.validateForm(form)) return false;
		//if(!valid) return false;
		data = form.serialize();

		var result = $.ajax({
					url: url,
					type: 'post',
					dataType: 'json',
					data: data,
				}).fail(function (ans) {
					console.log('Проблемы в РНР');
					form.find('.error_mes').text('На сервере произошла ошибка').show();
				});

		return result;



	}

	return {
		init: init
		};


})();

myModule.init();
