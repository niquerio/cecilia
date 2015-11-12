json.array! (@activities) do |act|  
  json.hours do 
    json.array! (act.keys.sort)  do |start|
      json.time start
      json.activities do
        json.array! (act[start]) do |activity|
          json.id activity.id
          json.title activity.title
          json.description activity.description
          json.start_time activity.start_time
          json.end_time activity.end_time
          json.classroom activity.classroom.name
  
          if(activity.difficulty)
            json.difficulty activity.difficulty.level
          end
          if(activity.activity_type)
            json.activity_type activity.activity_type.name
          end
          if(activity.activity_subtype)
            json.activity_subtype activity.activity_subtype.name
          end
          json.teachers do
            json.array! (@teachers.where(activity_id: activity.id)) do |teacher|
              json.username =  teacher.user.username
            end
          end
        end
      end
    end
  end
end
