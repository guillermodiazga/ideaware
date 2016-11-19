 var ApiYoutubeIsLoad=false;

 setTimeout(function(){$('#stopUser').hide(100);},1000);
 
 function handleAPILoaded() {
 	ApiYoutubeIsLoad=true;
 	$('#stopUser').hide(100);
 }

 function openModal(idVideoToShow,title){
 	$(' #player iframe ').attr('src', idVideoToShow);
 	$('#modalShowVideo')
 	.modal('show')
 	.find('.modal-title').text(title);
 }

 function init(vm){
 	$(window).scroll(function(e){
 		if ($(window).scrollTop() === $(document).height() - $(window).height()){
 			if(vm){
 				vm.loading = true;
 				vm.search();
 			}
 		}
 	});

 	$('#modalShowVideo').on('hidden.bs.modal', function () {
 		$('#player iframe ').attr('src', '');
 	});
 }