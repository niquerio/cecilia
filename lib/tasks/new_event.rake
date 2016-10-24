task :new_event => :environment do
  start_date = '2017-May-19'
  end_date = '2017-May-20'
  title = 'St. Cecilia at the Tower VI'

  last_year_event = Event.last
 
  event = Event.create do |e|
    e.start_date = start_date.to_datetime
    e.end_date = end_date.to_datetime
    e.title = title
  end

  Page.where(event: last_year_event).each do |last_year_page|
    next if last_year_page.slug == 'big_sing'
    Page.create do |p|
      p.slug = last_year_page.slug
      p.title = last_year_page.title
      p.body = last_year_page.body
      p.event = event
    end
  end

  Classroom.where(event: last_year_event).each do |last_year_classroom|
    Classroom.create do |c|
      c.name = last_year_classroom.name
      c.description = last_year_classroom.description
      c.event = event
    end
  end
end
