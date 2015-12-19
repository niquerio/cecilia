json.array! (@difficulties) do |difficulty|
  json.id difficulty.id
  json.level difficulty.level
  json.description difficulty.description
end
