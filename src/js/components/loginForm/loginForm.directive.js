function loginForm() {
	return {
		restrict: 'E',
		scope: true,
		template: require('html!./loginForm.html'),
		controller: LoginFormController,
		controllerAs: 'login'
	}
}

class LoginFormController {
	constructor($scope, AuthService, $timeout, $localStorage) {
		this.AuthService = AuthService;
		this.$timeout = $timeout;
		this.$localStorage = $localStorage;
		this.$scope = $scope;

		this.errorMessage = 'Wrong username or password. Please try again.';
		this.error = false;
		this.user = {};
	}

	login() {
		this.AuthService.login(this.user)
			.catch(() => {
				//Failed login
				this.user = {};
				this.error = true;
				this.$timeout(()=> {
					this.error = false;
				}, 3000);
				this.$scope.$apply();

			});
	}
}


LoginFormController.$inject = ['$scope', 'AuthService', '$timeout', '$localStorage'];


export default loginForm;