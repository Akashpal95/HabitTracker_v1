{
    //Function to set event on all habits
    let allHabitsEventSetter =  function(){
        //Setting event on all delete links
        $.each($(' .delete-habit-button'), (index, item) => {deleteHabit(item)});
    }

    //Method to add a habit
    let addHabit = function(){
        let addHabitForm = $('#add-habit-form');
        addHabitForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/habits/create',
                data:addHabitForm.serialize(),
                success: function(data){
                    console.log(data);
                    $('#habit-container').append(newHabitDom(data));
                    allHabitsEventSetter();
                },
                error: function(err){
                    console.log('Error : ', err.responseText);
                }
            });
        })
    }
    //method to delete a habit
    let deleteHabit = function(deleteLink){
        
        $(deleteLink).click(function(e){
            console.log("Coming here");
            e.preventDefault();
            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);  
                    $(`#habit-card-${data.habit_id}`).remove();
                    // showNotification('success', 'Post deleted!!');
                },
                error: function(err){
                    // showNotification('error', 'Error in deleting Post!!');
                    console.log('Error:', err.responseText);
                }
            });
        });
    }

    let newHabitDom = function(data){
        return $(`<div class="habit-card" id = "habit-card-${data.habit._id}"style="display:flex;align-items: center;">
        <p class="habit-name-container">${data.habit.name}</p>
        <a class="delete-habit-button" href="habits/delete/${data.habit._id}"><ion-icon name="trash-outline"></ion-icon></a>
    </div>`)
    };
    addHabit();
    allHabitsEventSetter();
}