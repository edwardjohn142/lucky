var langJSON ={};
var contentModalID = "";




const toggleModal = function(){
    if($('#myModal').hasClass('active')){
        $('body,html').css('height','').css('width','').css('overflow','')
        $('#myModal').removeClass('active');
        $(contentModalID).css('display','');
    }else{
        $('html,body').scrollTop()
        $('body,html')
            .css('height','100vh')
            .css('width','100vw')
            .css('overflow','hidden')
        $('#myModal').addClass('active')
    }
} 

const openPopup = function(modalID){
    var title = '';
    contentModalID = modalID;
    $(modalID).css('display','block');
    toggleModal();
    if(modalID == '#security') title = langJSON._popup_text._security.title_header;
    if(modalID == '#remote') title = langJSON._popup_text._support.title_header;
    if(modalID == '#contact') title = langJSON._popup_text._contact.title_header;
    if(modalID == '#safety') title = langJSON._popup_text._safety.title_header;
    if(modalID == '#game_guide') title = langJSON._popup_text._game_guide.title_header;
    if(modalID == '#mobile_service') title = langJSON._popup_text._service.title_header;
    if(modalID == '#notice') title = langJSON._popup_text._notice.title_header;
    if(modalID == '#event') title = langJSON._popup_text._event.title_header;
    if(modalID == '#rank' || modalID == '#rank_mobile') title = langJSON._popup_text._rank.title_header;
    $('#popup_title').text(title)
}

const openGuide = function(game_type){
    game_type = game_type ? game_type :"#guide_baccarat" ;
    $( "#foo" ).trigger( game_type );
    $('a[href="'+game_type+'"]').click()
    openPopup('#guide')
}


const login = function(){
    if(!$('#login_username').val() || !$('#login_password').val()) {
        swal({
            html:true,
            title:'langJSON.invalid_login',
            confirmButtonText: 'langJSON.confirm'
        });
        return;
    }
    console.log($('#login_username').val());
    
    var form_data = new FormData();
    form_data.append('lang','en');
    form_data.append("username", $('#login_username').val());
    form_data.append("password", $('#login_password').val()); 
    $.ajax({
        url: API_URL + "_player/player/login",
        data:form_data,
        method:'POST',
        "Content-Type": false ,
        processData: false,
        success: function(response){
            console.log(response);
            if (response.status == 1) {
                
                if (response.context.status == 2) {
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + 1);
                    document.cookie = "session_id="+response.context.session_id+"; expires="+expireDate;

                }else{
                    swal({
                        html:true,
                        title:langJSON.invalid_login,
                        confirmButtonText: langJSON.confirm
                    }); 
                    
                }
            }
        },
        error:function (jqXHR, textStatus, errorThrown) { 
            console.log("error");
            
         }
    });

}

const contactCS = function(){
    swal({
        html: true,
        title: langJSON._alert.contactcs,
        text: '070-000-000',
        confirmButtonText: langJSON.confirm
    });
}

const register = function(){
    if($('#reg_username').val().length <=0){
        $('#reg_username').focus();
        openRegPopUpMessage(langJSON._alert._register.enter_id);
        return;
    }
    if($('#reg_username').val().length <= 3 ||$('#reg_username').val().length >= 13){
        $('#reg_username').focus();
        $('#username').parent().removeClass('required');
        openRegPopUpMessage(langJSON._alert._register.id_count);
        return;
    }

    // Password --------------------------------------------------------------
    if($('#reg_password').val().length <= 0){
        $('#reg_password').focus();
        openRegPopUpMessage(langJSON._alert._register.enter_password);
        return;
    }
    if($('#reg_password').val().length < 6 ||$('#reg_password').val().length > 10){
        $('#reg_password').focus();
        openRegPopUpMessage(langJSON._alert._register.password_count);
        return;
    }
    if($('#reg_confirm_password').val().length <= 0){
        $('#reg_confirm_password').focus();
        openRegPopUpMessage(langJSON._alert._register.password_again);
        return;
    }
    if($('#reg_confirm_password').val() !=$('#reg_password').val() ){
        $('#reg_confirm_password').focus();
        openRegPopUpMessage(langJSON._alert._register.password_not_match);
        return;
    }

    // Nickname -------------------------------------------------------------
    if($('#reg_nickname').val().length <= 0 ){
        $('#reg_nickname').focus();
        openRegPopUpMessage(langJSON._alert._register.enter_nickname);
        return;
    }

    if($('#reg_nickname').val().length < 3 ||$('#reg_nickname').val().length > 8){
        $('#reg_nickname').focus();
        openRegPopUpMessage(langJSON._alert._register.nickname_count);
        return;
    }

    // Email ---------------------------------------------------------------
    if($('#reg_email').val().length <= 0 ){
        $('#reg_email').focus();
        openRegPopUpMessage(langJSON._alert._register.enter_email);
        return;
    }

    // Phone ---------------------------------------------------------------
    if($('#reg_mobile').val().length <= 0 ){
        $('#reg_mobile').focus();
        openRegPopUpMessage(langJSON._alert._register.enter_mobile);
        return;
    }

    // Bank Name -----------------------------------------------------------
    if($('#reg_bank_name').val().length <= 0 ){
        $('#reg_bank_name').focus();
        openRegPopUpMessage(langJSON._alert._register.enter_bank);
        return;
    }

    // Bank Account Number -------------------------------------------------
    if($('#reg_account_number').val().length <= 0 ){
        $('#reg_account_number').focus();
        openRegPopUpMessage(langJSON._alert._register.enter_account_number);
        return;
    }

    // Bank Account Name ---------------------------------------------------
    if($('#reg_account_name').val().length <= 0 ){
        $('#reg_account_name').focus();
        openRegPopUpMessage(langJSON._alert._register.enter_account_holder);
        return;
    }

    // Exchange Pin --------------------------------------------------------
    if($('#reg_exchange_pin').val().length <= 0 ){
        $('#reg_exchange_pin').focus();
        openRegPopUpMessage(langJSON._alert._register.enter_exchange_password);
        return;
    }
    if($('#reg_exchange_pin').val().length != 4){
        $('#reg_exchange_pin').focus();
        openRegPopUpMessage(langJSON._alert._register.exchange_password_count);
        return;
    }
    var form_data = new FormData();
    form_data.append('lang', getCookie('lang') || 'kr');
    form_data.append('username', $('#reg_username'));
    form_data.append('password',$('#reg_password'));
    form_data.append('confirm_password',$('#reg_confirm_password'));
    form_data.append('pin',$('#reg_exchange_pin'));
    form_data.append('nickname',$('#reg_nickname'));
    form_data.append('email',$('#reg_email'));
    form_data.append('phone',$('#reg_mobile'));
    form_data.append('agent_username',$('#reg_agent_id'));
    form_data.append('bank_name',$('#reg_bank_name'));
    form_data.append('account_holder',$('#reg_account_name'));
}

const openRegPopUpMessage = function(message){
    swal({
        html: true,
        title:  message,
        confirmButtonText: langJSON.confirm
    });
}