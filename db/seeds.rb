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

Title.delete_all
["","Lady","Lord","THL","Master","Mistress","Sir","Baron","Baroness","Count","Countess","Viscount","Viscountess","Duke","Duchess","King","Queen"].each do |title|
  Title.find_or_create_by(name: title)
end

ActivityType.delete_all
ActivityType.create([
 {name: 'Lecture',description: 'In this class the teacher will lecture to the students'},
 {name: 'Playing',description: 'In this class the students will be encouraged to play or sing music'},
])

ActivitySubtype.delete_all
ActivitySubtype.create([
 {name: 'Vocal', description: 'This class is primarily for vocalists'},
 {name: 'Instrumental', description: 'This class is primarily for instrumentalists'},
 {name: 'Vocal & Instrumental', description: 'This class is suitable for both vocalists and instrumentalists'},
])

StaffRole.delete_all
StaffRole.create([
  {name: 'Event Steward', description: 'Person in charge of running the event'},
  {name: 'Deputy Event Steward', description: 'Second in Command of the event'},
  {name: 'Tavern Steward', description: 'Person in charge of running the lunch and dinner taverns'},
  {name: 'Lodging Coordinator', description: 'Person in charge of coordinating housing for out of town attendees'},
])

