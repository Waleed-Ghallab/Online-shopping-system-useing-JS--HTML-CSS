$('.message a').click(function(){
    $('form').animate({height:"toggle", opacity: "toggle"},"slow");
}); //jquery

 
    var _name=document.getElementById('name'),
     pass=document.getElementById('pass'),
    _mail=document.getElementById('mail'),
    err=document.getElementById('error'),
    loginUser=document.getElementById('allmysons'),
    loginPass=document.getElementById('allmysons2'),
    loginFather=document.getElementById('father'),
    form=document.getElementById('form');

     userRecord=JSON.parse(localStorage.getItem('userRecord')) || [];

    form.addEventListener('submit',(e)=>{
        let messages=[];
        if (_name.value === '' || _name.value==null) {
            messages.push("this field is required");
        }
        if(_name.value.length<8){
            messages.push("this field must be more than 8 ");
        }
        if(_name.value.length>20){
            messages.push("this field must be less than 20");
        }
        if(!_name.value.match(/^[0-9a-zA-Z]+$/)){ //regular expression
            messages.push("invalid input");
        }
        if(pass.value===''){
            messages.push("this field is required");
        }
        if(!_mail.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            messages.push("invalid email");
        }
        if(messages.length>0){
            e.preventDefault();
            err.innerText=messages.join(', ');
    
        }
        else{
            let record={
                name:_name.value,
                password:pass.value,
                email:_mail.value,
                };
            //let exist1=userRecord.length>=2;
            // let exist= userRecord.length>1 &&
            // JSON.parse(localStorage.getItem('userRecord')).map(data=>{
            //     data.name.toLowerCase()==record.name.toLowerCase() &&
            //     data.email==record.email
            // });
                if(userRecord.length==0 ){
                userRecord.push(record);
                //localStorage.setItem('userRecord',JSON.stringify(userRecord));
                form.focus();
                alert("Account Created.");
                //e.preventDefault();
                }
                else{
                    userRecord.map(data=>{
                        if(data.email==record.email){
                            alert("This account already exists !");
                            form.focus();
                            e.preventDefault();
                            _mail.reset();
                        }  
                    })
                    userRecord.push(record);
                    alert("Account Created.");
                }
                localStorage.setItem('userRecord',JSON.stringify(userRecord));
                    // alert("This account already exists !");
                    // e.preventDefault();
                    // exist=false;
            
            // record.preventDefault();
            
        }
        
    });

loginFather.addEventListener('submit',(e)=>{
    let users=[];
    let flag=false;
    const localUsers=JSON.parse(localStorage.getItem('userRecord'));
    if(userRecord.length>0){
    localUsers.map(data=>{
        if(loginUser.value==data.name && loginPass.value==data.password){
            flag=true;
            users.push(data);
            
        }
        //users.push(data);
    })
    }
    
    if(!flag){
        alert("User not found!");
        e.preventDefault();
    }else{
        alert("Login successful");
        localStorage.setItem('users',JSON.stringify(users));
    }

});
 
 

