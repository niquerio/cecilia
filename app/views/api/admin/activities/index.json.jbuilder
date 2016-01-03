json.array! (@activities) do |activity|
  json.id activity.id
  json.title activity.title
  if(activity.description)
    json.description activity.description
  end
  if(activity.start_time)
    json.start_time activity.start_time
  end
  if(activity.end_time)
    json.end_time activity.end_time
  end
  json.duration activity.duration
  if(activity.classroom)
    json.classroom_id activity.classroom.id
    json.classroom activity.classroom.name
  end
  json.difficulty_id activity.difficulty.id
  json.difficulty activity.difficulty.level
  json.activity_type_id activity.activity_type.id
  json.activity_type activity.activity_type.name
  json.activity_subtype_id activity.activity_subtype.id
  json.activity_subtype activity.activity_subtype.name
  json.teachers do
    json.array! (@teachers.where(activity_id: activity.id)) do |teacher|
      json.username teacher.user.id
      json.username teacher.user.username
      json.title teacher.user.title.name
      json.sca_first_name teacher.user.sca_first_name
      json.sca_last_name teacher.user.sca_last_name
    end 
  end
end
