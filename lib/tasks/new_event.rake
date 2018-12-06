#For 2018 update the event date via the mysql console directly. (So that the event id can be 7)

task :new_event => :environment do
  start_date = '2019-June-08'
  end_date = '2019-June-09'
  title = 'St. Cecilia at the Tower VIII'

  last_year_event = Event.find(7)
 
  event = Event.create do |e|
    e.start_date = start_date
    e.end_date = end_date
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
