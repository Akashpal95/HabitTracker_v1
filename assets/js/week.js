

{
    //change the status of a habit
    let changeStatus = function(statusCard){
        let id =statusCard.id;
        let temp = id.split("_");
        habitId = temp[0];
        statusId = temp[1];
        console.log(statusCard.value);
        if(statusCard.value =='done'){
            statusCard.classList.remove('notDone');
            statusCard.classList.add(statusCard.value);
        }else if(statusCard.value =='notDone'){
            statusCard.classList.remove('done');
            statusCard.classList.add(statusCard.value);
        }else{
            statusCard.classList.remove('done');
            statusCard.classList.remove('notDone');
        }
        $.ajax({
            type:'post',
            url:'/habits/update',
            data:{
                habitId : habitId,
                statusId : statusId,
                status : statusCard.value
            },
            success: function(data){
                console.log(data);
                // $('#habit-container').append(newHabitDom(data));
            },
            error: function(err){
                console.log('Error : ', err.responseText);
            }
        });
    }
    //Set event for all select items
    let eventSetter = function(){
        let allSelect = $('.select-status');
        for (let each of allSelect){
            $(each).change(function(){
                changeStatus(each);
            });
        }
    }
    eventSetter();
}