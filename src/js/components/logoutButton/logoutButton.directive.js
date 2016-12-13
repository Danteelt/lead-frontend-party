function logoutButton() {
	return {
		restrict: 'E',
		scope: true,
		template: require('html!./logoutButton.html'),
		controller: LogoutButtonController,
		controllerAs: 'logout'
	}
}

class LogoutButtonController {
	constructor(AuthService, $location) {
		this.AuthService = AuthService;
		this.$location = $location;
	}

	logout() {
		this.AuthService.logout();
		this.$location.path('/');
	}
}

LogoutButtonController.$inject = ['AuthService', '$location'];

export default logoutButton;