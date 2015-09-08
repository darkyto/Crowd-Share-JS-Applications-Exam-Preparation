var data = (function() {
	const USERNAME_STORAGEKEY = 'username-key',
		  AUTHCODE_STORAGEKEY = 'authcode-key',
		  SESSIONKEY_SERVERKEY = 'X-SessionKey';

	function userLogin(user) {
		var promise = new Promise(function(resolve, reject) {
			var requser = {
				username: user.username,
				authCode: sha1(user.username + user.password).toString()
			};

			$.ajax({
				url: '/auth',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(requser),
				success: function(user) {
					localStorage.setItem(USERNAME_STORAGEKEY, user.username);
					localStorage.setItem(SESSIONKEY_SERVERKEY, user.sessionKey);
					resolve(user);
				},
				error: function(err) {
					// you are getting XHR object - parse it and then proceed
					var obj = JSON.parse(err.responseText);
					toastr.warning(obj.message);				
					reject(err);
				}
			});
		});
		return promise;
	}

	function userRegister(user) {
		var promise = new Promise(function(resolve, reject) {
			var requser = {
				username: user.username,
				authCode: sha1(user.username + user.password).toString()
			};
			console.log(requser);

			$.ajax({
				url: '/user',
				method: 'POST',
				data: JSON.stringify(requser),
				contentType:'application/json',
				success: function(user) {
					console.log(user);
					resolve(user);
				},
				error: function(err) {
					// you are getting XHR object - parse it and then proceed
					var obj = JSON.parse(err.responseText);
					toastr.warning(obj.message);				
					reject(err);
				}
			});
		});
		return promise;
	}

	function userLogout() {
		// var promise = new Promise(function(resolve, reject) {
		// 	localStorage.removeItem(AUTHCODE_STORAGEKEY);
		// 	localStorage.removeItem(USERNAME_STORAGEKEY);
		// 	localStorage.removeItem(SESSIONKEY_SERVERKEY);
		// 	resolve();
		// });
		var promise = new Promise(function(resolve, reject) {
			$.ajax({
				url: '/user',
				method: 'PUT',
				headers: {
                    'X-SessionKey': getSessionKey()
                },
				contentType:'application/json',
				success: function(res) {
					resolve(res);
				}
			});
		});

		return promise.then(function() {
			return getSessionKey();
		});
	}

	function getSessionKey() {
		return localStorage.getItem(SESSIONKEY_SERVERKEY);
	}

	function hasCurrentUser() {
		return !!localStorage.getItem(USERNAME_STORAGEKEY) &&
      		   !!localStorage.getItem(SESSIONKEY_SERVERKEY);
	}	

	function usersFind() {

	}

	function getAllPosts() {
		var promise = new Promise(function(resolve, reject) {

			$.ajax({
				url: '/post',
				method: 'GET',
				contentType: 'application/json',
				success: function(res) {
					console.log(res);
					resolve(res);
				},
				error: function(err) {			
					reject(err);
				}
			});
		});
		return promise;
	}

	function createPost(post) {
		var promise = new Promise(function(resolve, reject) {

			var newPost = {
				title: post.title,
				body: post.body
			};

			$.ajax({
				url: '/post',
				method: 'POST',
				data: JSON.stringify(newPost),
				headers: {
                    'X-SessionKey': getSessionKey()
                },
				contentType: 'application/json',
				success: function(res) {
					resolve(res);
				},
				error: function(err) {			
					reject(err);
				}
			});
		});
		return promise;
	}

	return {
		users: {
			login: userLogin,
			logout: userLogout,
			register: userRegister,
			current: hasCurrentUser,
			find: usersFind
		},
		posts: {
			getAll: getAllPosts,
			createPost : createPost
		}
	};
}());