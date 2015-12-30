json.array! (@users) do |user|
  json.title user.title.name
  json.sca_first_name user.sca_first_name
  json.sca_last_name user.sca_last_name
  json.username user.username
  json.activities do
    json.array! (user.activities.where('event_id = ? AND classroom_id IS NOT NULL', @event.id)) do |activity|
      json.id activity.id
      json.title activity.title
      json.description activity.description
      json.start_time activity.start_time
      json.end_time activity.end_time
      json.classroom activity.classroom.name
      json.difficulty activity.difficulty.level
      json.activity_type activity.activity_type.name
      json.activity_subtype activity.activity_subtype.name
    end    
  end
end
