export default class ServersController {
	constructor($scope, $localStorage, $location, ServersService, $log, AuthService) {
		this.$scope = $scope;
		this.$localStorage = $localStorage;
		this.$location = $location;
		this.ServersService = ServersService;
		this.AuthService = AuthService;
		this.$log = $log;
		this.list = [];
		this.getList();
	}

	getList() {
		this.AuthService.checkToken().then((token)=> {
			this.ServersService.getServersList(token).then((data) => {
				this.list = data;
				this.$scope.$apply();
			})
			.catch(()=>{
				this.AuthService.logout();
				this.$location.path('/');
			});
		})
		.catch(()=> {
			this.$log.warn('No token found.');
		});
	}
}

ServersController.$inject = ['$scope', '$localStorage', '$location', 'ServersService', '$log', 'AuthService'];

