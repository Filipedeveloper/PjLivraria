
//criarModuloController
appAutores.controller("indexController", function($scope, $http) {
    
    $scope.autores = [];
	$scope.autor = {};

	$scope.livrosAutor = [];
	$scope.livroAutor = {};

	$scope.livros = [];
	$scope.livro = {};
	
	//$scope.listaAutoresLivros = [];
	//$scope.listaAutoresLivro = {};

	//carregar autores
	carregarAutores = function(){
		$http({method:'GET', url:'https://bibliapp.herokuapp.com/api/authors'})
		.then(function(response){
			//console.autores.push(response.data);
			$scope.autores = response.data;

			
		}, function(response){
			console.log(response.data);
			console.log(response.status);
		});
	};
	carregarAutores();


	//carregar livros por autor
	carregarLivrosAutor = function(autor){
		$http({method:'GET', url:'https://bibliapp.herokuapp.com/api/books/' + autor.id})
		.then(function(response){
			//console.autores.push(response.data);
			$scope.livrosAutor = [];
			$scope.livrosAutor = response.data;

			
		}, function(response){
			console.log(response.data);
			console.log(response.status);
		});
	};
	

	//salvarAutor
	$scope.salvarAutor=function(){
		$http({method:'POST', url: 'https://bibliapp.herokuapp.com/api/authors', data: $scope.autor})
		.then(function(response){
			$("#myModalEditarAutor").modal();
			$scope.autores.push(response.data);
			carregarAutores();
			cancelarAlteracao();
		}, function(response){
			$http({method:'PUT', url: 'https://bibliapp.herokuapp.com/api/authors', data: $scope.autor})
			.then(function(response){
				carregarAutores();
				cancelarAlteracao();
			}, function(response2){
				
			});
		});
	};

	//alterAutor
	$scope.alterarAutor=function(aut){
		$("#myModalEditarAutor").modal();
		$scope.autor = angular.copy(aut);
		$scope.autorTitulo = 'Editar Autor ' + aut.firstName + ' ' + aut.lastName;
	};

	//formRegistrar
	$scope.registrarAutor=function(){
		$("#myModalEditarAutor").modal();
		cancelarAlteracao();
		$scope.autorTitulo = 'Cadastrar novo autor';
	};

	//modalExcluirAutor
	$scope.modalExcluir=function(autor){
		
		$("#myModalExcluirAutor").modal();
		$scope.autorMensagem = 'Deseja realmente excluir o autor ' + autor.firstName + ' ' + autor.lastName + '?';
		$scope.aut = autor; 
	};

	//modalLivrosAutor
	$scope.modalLivrosAutor=function(autor){
		
		$("#myModalListaLivros").modal();
		$scope.tituloModal = 'Livros do autor ' + autor.firstName + ' ' + autor.lastName + '?';
		$scope.aut = autor; 
		carregarLivrosAutor(autor);
	};

	//deletarAutor
	$scope.deletarAutor=function(autor){
		$http({method:'DELETE', url: 'https://bibliapp.herokuapp.com/api/authors/' + autor.id})
		.then(function(response){
			//buscar posição no array
			for(i=0; i<$scope.autores.length; i++){
				if($scope.autores[i].id == autor.id){
					$scope.autores.splice(i, 1);
					break;
				}
			}
		}, function(response){
			console.log(response.data);
			console.log(response.status);
		})
	};

	//limparCampos
	cancelarAlteracao=function(){
		$scope.autor = {};
		$scope.livrosAutor = [];
	};

	//ordenarLovro
	$scope.ordenarAutores = function(keyname){
		$scope.sortKey = keyname;
		$scope.reverse = !$scope.reverse;
	};
});

//controlller livros
appAutores.controller("livroController", function($scope, $http) {
	//carregar todos os liros
	carregarTodosLivros = function(){
		$http({method:'GET', url:'https://bibliapp.herokuapp.com/api/books'})
		.then(function(response){
			console.log(response.data);
			$scope.livros = response.data;  
		}, function(response){
			console.log(response.data);
			console.log(response.status);
		});

		//busca todos os autores
		/*$http({method:'GET', url:'https://bibliapp.herokuapp.com/api/authors'})
		.then(function(response){			
			$scope.autores = response.data;
			//percorrer lista de livros
			for(i=0; i<$scope.livros.length; i++){
				//percorre lista de autores
				for (a =0; a < $scope.autores.length; a++) {
					idAutor = $scope.autores[a].id;
					idLivroAutor = $scope.livros[i].authorId;

					if(idAutor == idLivroAutor){
						$scope.listaAutoresLivros.([{
							autor: $scope.autores[a].firstName + ' ' +$scope.autores[a].lastName,
							tituloLivro: $scope.livros[i].title
						}]);

						//break;
					}
				}
			}
			
		}, function(response){
			console.log(response.data);
			console.log(response.status);
		});*/
	};
	carregarTodosLivros();

	//ordenarLovro
	$scope.ordenar = function(keyname){
		$scope.sortKey = keyname;
		$scope.reverse = !$scope.reverse;
	};

	//salvarLivro
	$scope.salvarLivro=function(){
		$http({method:'POST', url: 'https://bibliapp.herokuapp.com/api/books', data: $scope.livro})
		.then(function(response){
			$("#myModalLivro").modal();
			//$scope.livros.push(response.data);
			carregarTodosLivros();
			cancelarAlteracaoLivro();
		}, function(response){
			$http({method:'PUT', url: 'https://bibliapp.herokuapp.com/api/books', data: $scope.livro})
			.then(function(response){
				carregarCliente();
				cancelarAlteracao();
			}, function(response2){
				
			});
		});
	};

	//formRegistrarLivro
	$scope.registrarLivro=function(){
		
		$("#myModalLivro").modal();
		cancelarAlteracaoLivro();
		$scope.livrotituloModal = 'Cadastrar novo Livro';
	};

	//alterLivro
	$scope.alterarLivro=function(lr){
		
		$("#myModalLivro").modal();
		$scope.livro = angular.copy(lr);
		$scope.tituloLivroModal = 'Editar Livro: ' + lr.title;
		
	};



	//modalExcluirLivro
	$scope.modalExcluirLivro=function(livro){
		
		$("#myModalExcluirLivro").modal();
		$scope.excluirLivroMensagem = 'Deseja realmente excluir o livro ' + livro.title +'?';
		$scope.lr = livro; 
	};

	//deletarLivro
	$scope.deletarLivro=function(livro){
		$http({method:'DELETE', url: 'https://bibliapp.herokuapp.com/api/books/' + livro.id})
		.then(function(response){
			//buscar posição no array
			for(i=0; i<$scope.livros.length; i++){
				if($scope.livros[i].id == livro.id){
					$scope.livros.splice(i, 1);
					break;
				}
			}
		}, function(response){
			console.log(response.data);
			console.log(response.status);
		})
	};

	//limparCampos
	cancelarAlteracaoLivro=function(){
		$scope.livro = {};
	};
});

//configurando rotas
appAutores.config(function($routeProvider) {
	$routeProvider
	.when("/", {
	    templateUrl : "autores.html",
	    controller: 'indexController'
	})
	.when("/livros", {
	    templateUrl : "livros.html",
	    controller: 'indexController'
	});
});