
function checkAuth(){
    
    var cookies = [];
    var session_id = document.cookie.split(";").length > 1 ?  document.cookie.split(";")[1].split("=")[1] : "";  
    
    var elems = document.getElementsByClassName( document.cookie.split(";").length > 1 ? "authenticated" : "authenticated" );
    
    for (let i = 0; i < elems.length; i++) {
        elems[i].style.display="none";
    }
            
}

checkAuth();
function openModal(action){
    if(action == false){
        $('#myModal').removeClass('active');
        $('body').css('overflow','');
        $('body').css('height','');
        $('html').css('overflow','');
        $('html').css('height','');
    }else{
        $('#myModal').addClass('active');
        $('body').css('overflow','hidden');
        $('body').css('height','100vh');
        $('html').css('overflow','hidden');
        $('html').css('height','100vh');
        $("html, body").animate({ scrollTop: 0 }, "");
    }
}

function toggleSideBar(){

    let sidebar = document.getElementById("sidebar");
    let sidebarFlag = sidebar.classList.contains("active");
    if (sidebarFlag) {
        sidebar.classList.remove("active");
        let node = document.getElementsByClassName('a-secondary-nav');
        $('body').css('overflow','');
        $('body').css('height','');
        $('html').css('overflow','');
        $('html').css('height','');
        for (let i = 0; i < node.length; i++) {
            node[i].classList.remove("slideInRight");
        }
    }else{
        sidebar.classList.add("active");
        $('body').css('overflow','hidden');
        $('body').css('height','100vh');
        $('html').css('overflow','hidden');
        $('html').css('height','100vh');
        animateCSS();
    }

}

function toggleAuth(){
    let auth = document.getElementById("pop_auth");
    let authFlag = auth.classList.contains("active");
    if (authFlag) {
        auth.classList.remove("active");
        $('body').css('overflow','');
        $('body').css('height','');
        $('html').css('overflow','');
        $('html').css('height','');

    }else{
        auth.classList.add("active");
        $('body').css('overflow','hidden');
        $('body').css('height','100vh');
        $('html').css('overflow','hidden');
        $('html').css('height','100vh');
    }
}


function animateCSS() {
    var node = document.getElementsByClassName('a-secondary-nav');
    let delay = 0;
    for (let i = 0; i < node.length; i++) {
        setTimeout(function(){node[i].classList.add("slideInRight");},delay);
        delay += 100;
    }
}

function addAnimationClass(element,index,limit){
    element[index].classList.add("slideInRight");
    if(index + 1 < limit){
        setTimeout(function(){addAnimationClass(element, (index + 1),limit)},20);
    }
}

// animateCSS();


function adjustView() {
    // return;
    if(!document.getElementById("bee_left")){
        return
    }
    var left = document.getElementById("bee_left");
    var right = document.getElementById("bee-right");
    var game_container = document.getElementById("game_container");
    var info = document.getElementById("info");
    var rect_left = left.getBoundingClientRect();
    var rect_right = right.getBoundingClientRect();
    

    var w = window.innerWidth;                
    if(w <= 1200){
        
        document.getElementById("left_container").style.width = 0;
        left.style.width = (w - 840 ) + "px";
        right.style.maxWidth  = "100%"; 
        right.style.width  =  " 100%";
        info.style.width  = 100 + "%";
        document.getElementById("right_container").style.width = "100%";
    }else{                    
        left.style.width = rect_left.right + "px";
        document.getElementById("left_container").style.width = (360 ) + "px";
        document.getElementById("right_container").style.width = (w - rect_left.right ) + "px";
        right.style.width = ((w - rect_left.right )) + "px"; 
        game_container.style.width = ((w - rect_left.right )) + "px"; 
        info.style.width = ((w - rect_left.right ) + 154) + "px"; 
        right.style.maxWidth  =  " 1920px"; 
        game_container.style.maxWidth  =  " 1920px"; 
        info.style.maxWidth  =  " 2074px";
    }

    document.getElementsByClassName("info-three")[0].style.width =  right.style.width;
    document.getElementsByClassName("info-two")[0].style.width =  right.style.width;
}
function setBgPurple(x){
    x.getElementsByTagName('svg')[0].getElementsByTagName('polygon')[0].setAttribute("fill", "url(#image_purple_on)");;
}
function setBgPurpleOff(x){
    x.getElementsByTagName('svg')[0].getElementsByTagName('polygon')[0].setAttribute("fill", "url(#image_purple)");;
}


 adjustView();

 $(document).ready(function () {
    // console.log('hover');

    // $('.info-button').on("mouseenter", function() {
    //     console.log('mouse enters');
    //     $(this).find('.bubble').css('display', 'block');
    // }).on("mouseleave", function() {
    //     console.log('mouse leave');
    //     $(this).find('.bubble').css('display', 'none');
    // });
const login = function(){
    if(!$('#login_username').val() || !$('#login_password').val()) {
        swal({
            html:true,
            title:'$rootScope.trans.invalid_login',
            confirmButtonText: '$rootScope.trans.confirm'
        });
        return;
    }
    var form_data = new FormData();
    form_data.append('lang','en');
    form_data.append("username", $('#login_username').val());
    form_data.append("password", $('#login_password').val()); 
    $.ajax({
        url: API_URL + "_player/player/login",
        data:form_data,
        method:'POST',
        headers: { "Content-Type": false ,processData: false,},
        success: function(result){
            if (response.data.status == 1) {
                if (response.data.context.status == 2) {
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + 1);
                    document.cookie = "session_id="+response.data.context.session_id+"; expires="+expireDate;

                }else{
                    console.log("failed");
                    
                }
            }
        },
        error:function (jqXHR, textStatus, errorThrown) { 
            console.log("error");
            
         }
    });

}


    $(window).resize(function(){
        let vh = $(this).innerHeight * 0.01;
        // document.documentElement.style.setProperty('--vh', `${vh}px`);
        
    });

    function udjustHeight(){
        let wHeight= $(window).height();
        let emptySpace = wHeight -  ($('.bottom-link').position().top );
        if(260 < emptySpace){
            let bgLinkContainer = $('.bottom-link');
            let bgLinkContainerContent = $('.bottom-link .bg');
            bgLinkContainer.css('height',(emptySpace) +'px');
            bgLinkContainerContent.css('height',(emptySpace) +'px');
        }
    }

    document.addEventListener('touchmove', function(event) {
        event = event.originalEvent || event;
        if(event.scale > 1) {
          event.preventDefault();
        }
      }, false);
    
})


const getCookie = function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
    



