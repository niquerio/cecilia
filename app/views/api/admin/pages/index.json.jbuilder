json.array! (@pages) do |page|
  json.id page.id
  json.slug page.slug
  json.title page.title
  json.body page.body
end
