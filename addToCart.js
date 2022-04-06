const addToCart=document.getElementsByClassName('addToCart');
let items=[];
for(let i=0;i<addToCart.length;i++){
    addToCart[i].addEventListener("click",function(e){
        if(!JSON.parse(localStorage.getItem('users'))){
            alert("Please Login");
            window.location='login.html';
        }else{
        // console.log(e.target.parentElement.children[0].children[0]); //image
        // console.log(e.target.parentElement.children[1].textContent); //name
        // console.log(e.target.parentElement.children[2].textContent); //price
        if(typeof(Storage)!== 'undefined'){ //checking local storage on browser
            let item={
                id:i+1,//serial number
                img: e.target.parentElement.children[0].children[0],
                name:e.target.parentElement.children[1].textContent,
                price: e.target.parentElement.children[2].textContent,
                count: 1
            };
            if(JSON.parse(localStorage.getItem('items'))===null){ //law storage fadya //flag w a8yr law awl mara yshtry
                items.push(item);
                localStorage.setItem("items",JSON.stringify(items)); //set array in storage
                window.location.reload();
            }else{
                const localItems=JSON.parse(localStorage.getItem("items")); //law msh fadya khod el items kolha f const w check 3leha law mtkrra zawd el counter 
                localItems.map(data=>{
                    if(item.id==data.id){
                        item.count=data.count+1;
                    }else{
                        items.push(data); //law msh mtkrra 7otha fel array
                    }
                });
                items.push(item);
                localStorage.setItem('items',JSON.stringify(items));
                window.location.reload();
            }

        }else{
            console.log('local storage error')
        }
    }
    });
}
draw(items);

//delete data
function Delete(e){
    let items=[];
    //console.log(e.parentElement.parentElement.children[0].textContent);
    const _localItems=JSON.parse(localStorage.getItem("items"));
    _localItems.map(data=>{
        if(data.id !=e.parentElement.parentElement.children[0].textContent){
            items.push(data);
        }else{
            if(data.count>=2){
                data.count--;
                items.push(data);
            }
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
    //window.location.reload();
    draw(items);
    
}




//adding data in cart table
function draw(items=[]){
const cartTable=document.getElementById("cartBox");//table
let tableData='';
tableData+='<tr><th>Serial number</th><th>Product name</th><th>Product number</th><th>Product price</th><th>Edit</th></tr>';

if(JSON.parse(localStorage.getItem('items'))===null){
    tableData+='<tr><td colspan="5" align="center">No Items Found!</td></tr>';
}else{
    JSON.parse(localStorage.getItem('items')).map(data=>{
        tableData +='<tr><td align="center">'+data.id+'</td><td >'+data.name+'</td><td align="center">'+data.count+'</td><td align="center">'+data.price+'</td><td align="center"><a href="#" onclick=Delete(this);>Delete</a></td></tr>';
    });
    tableData+='<tr><td colspan="5" align="center"><a href="mailto:waleed@gmail.com&subject=Welcome&body=WelcomeTo my website"><input id="add" type="button" value="Check Out" /></a></td></tr>';
}
cartTable.innerHTML=tableData;//eb3t el table of items lel table tag fel cart page
}

