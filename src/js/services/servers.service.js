class ServersService {
	constructor($http, $localStorage, AuthService, config) {
		this.$http = $http;
		this.$localStorage = $localStorage;
		this.AuthService = AuthService;
		this.serversEndpoint = config.serversUrl;
		this.servers = [];
	}

	getServersList(token) {
		return new Promise((resolve, reject)=> {
			this.$http({
				method: 'GET',
				url: this.serversEndpoint,
				headers: {
					'Authorization': token
				}
			})
			.then(function (e) {
				resolve(e.data);
			}, function () {
				reject()
			});
		});
	}
}

ServersService.$inject = ['$http', '$localStorage', 'AuthService', 'config'];

export default ServersService;
