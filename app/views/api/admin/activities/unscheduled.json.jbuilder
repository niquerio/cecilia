json.array! (@activities) do |activity|
  json.id activity.id
  json.title activity.title
  json.duration activity.duration
end
