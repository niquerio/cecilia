json.array! (@activity_subtypes) do |activity_subtype|
  json.id activity_subtype.id
  json.name activity_subtype.name
  json.description activity_subtype.description
end
