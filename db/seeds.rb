# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Difficulty.delete_all
Difficulty.create([ 
  {level: 1, description: 'Class is appropriate for nonmusicians'},
  {level: 2, description: 'Class is geared toward those who have studied music for less than a year, or who make music only occasionally.'},
  {level: 3, description: 'Concepts/skills in this class are aimed at musicians who are comfortable with their instruments.'},
  {level: 4, description: 'Experienced musicians may find this class challenging.'},
  {level: 5, description: 'This class is very challenging and/or requires a significant amount of specialized knowledge as a prerequisite.'}
])

["Master","Mistress","Sir","Baron","Baroness","THL","Lord","Lady"].each do |title|
  Title.find_or_create_by_name(title)
end

ActivityType.delete_all
Activity.create([
 {name: 'Lecture',description: 'In this class the teacher will lecture to the students'},
 {name: 'Playing',description: 'In this class the students will be encouraged to play or sing music'},
])

ActivitySubtype.delete_all
ActivitySubtype.create([
 {name: 'Vocal', description: 'This class is primarily for vocalists'},
 {name: 'Instrumental', description: 'This class is primarily for instrumentalists'},
 {name: 'Vocal & Instrumental', description: 'This class is suitable for both vocalists and instrumentalists'},
])


