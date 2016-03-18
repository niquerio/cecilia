json.id @user.id
json.title @user.title.name
json.sca_first_name @user.sca_first_name
json.sca_last_name @user.sca_last_name
json.modern_first_name @user.modern_first_name
json.modern_last_name @user.modern_last_name
json.bio @user.bio
json.activities do
  json.array! (@user.activities.where('classroom_id IS NOT NULL')) do |activity|
    json.id activity.id
    json.year activity.start_time.strftime('%Y')
    json.title activity.title
    json.difficulty activity.difficulty.level
    json.activity_type activity.activity_type.name
    json.activity_subtype activity.activity_subtype.name
  end    
end
