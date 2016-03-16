json.array! (@users) do |user|
  json.id user.id
  json.username user.username
  json.sca_first_name user.sca_first_name
  json.sca_last_name user.sca_last_name
  json.modern_first_name user.modern_first_name
  json.modern_last_name user.modern_last_name
  json.title_id  user.title_id
  json.bio  user.bio
end
