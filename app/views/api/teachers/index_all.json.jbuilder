json.array! (@users) do |user|
  json.title user.title.name
  json.sca_first_name user.sca_first_name
  json.sca_last_name user.sca_last_name
  json.username user.username
end
