import angular from 'angular';

class AuthService {
	constructor($http, $localStorage, $location, config) {
		this.$location = $location;
		this.$localStorage = $localStorage;
		this.endpoint = config.tokenUrl;
		this.$http = $http;
	}

	login(user) {
		return new Promise((resolve, reject) => {
			this.$http({
				method: 'POST',
				url: this.endpoint,
				data: angular.toJson(user),
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			})
			.then((e) => {
				this.$location.path('/servers');
				this.$localStorage['testio-token'] = e.data.token;
			}, () => {
				reject();
			});
		});
	}

	logout() {
		this.$localStorage['testio-token'] = '';
	}

	checkToken() {
		return new Promise((resolve, reject)=> {
			this.token = this.$localStorage['testio-token'];
			if (angular.isUndefined(this.token) || this.token == '' || this.token == null) {
				this.$location.path('/');
				reject();
			} else {
				resolve(this.token);
			}
		});
	}

}

AuthService.$inject = ['$http', '$localStorage', '$location', 'config'];

export default AuthService;
