json.id @activity.id
json.title @activity.title
json.description @activity.description
json.start_time @activity.start_time
json.end_time @activity.end_time
if(@activity.classroom)
  json.classroom @activity.classroom.name
else
  json.classroom nil
end
json.difficulty @activity.difficulty.level
json.difficulty_description @activity.difficulty.description
json.activity_type @activity.activity_type.name
json.activity_subtype @activity.activity_subtype.name
json.teachers do
  json.array! (@teachers) do |teacher|
    json.username teacher.user.username
    json.title teacher.user.title.name
    json.sca_first_name teacher.user.sca_first_name
    json.sca_last_name teacher.user.sca_last_name
  end 
end
