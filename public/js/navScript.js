const topNav = document.querySelector('.topnav');

function responsiveBar(){
    if(topNav.className ==='topnav'){
       topNav.className += ' responsive';
    }else{
       topNav.className = 'topnav'
    }
 }