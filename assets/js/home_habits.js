{
    
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
                },
                error: function(err){
                    console.log('Error : ', err.responseText);
                }
            });
        })
    }
    let newHabitDom = function(data){
        return $(`<div class="habit-card" style="display:flex;align-items: center;">
        <a class="delete-habit-button" href="habits/delete/${data.habit._id}">X</a>
        <p>${data.habit.name}</p>
    </div>`)
    };
    addHabit();
}