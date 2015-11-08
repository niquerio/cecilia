namespace :old_data do
  desc "Migrate Users"
  task :users => :environment do
    readFile('cecilia_users'){ |fields| 
      User.create do |u|
       u.email = fields[0]
       u.username = fields[1]
       u.modern_first_name = fields[2]
       u.modern_last_name = fields[3]
       u.title_id = Title.where(name: fields[4]).first.id
       u.sca_first_name = fields[5]
       u.sca_last_name = fields[6]
       u.nickname = fields [7] 
       u.bio = fields[8] 
       u.password = Devise.friendly_token.first(8)
      end
    }
  end

  desc "Migrate Events"
  task :events => :environment do
    readFile('event'){ |fields| 
      Event.create do |u|
        u.start_date = fields[0]
        u.end_date = fields[1]
        u.title = fields[2]
      end
    }
  end


  desc "Migrate Classrooms"
  task :classrooms => :environment do
    readFile('classrooms'){ |fields|
      Classroom.create do |r|
        r.name = fields[0]
        r.description = fields[1]
        r.event_id = Event.where(start_date: DateTime.parse(fields[2])).first.id
      end
    }
  end

  desc "Migrate FAQ"
  task :faq => :environment do
    makePage('F.A.Q.','faq')
  end

  desc "Migrate Directions"
  task :directions => :environment do
    makePage('Directions', 'directions')
  end

  desc "Migrate Food"
  task :food => :environment do
    makePage('Taverns', 'food')
  end

  desc "Migrate Concerts"
  task :concerts => :environment do
    makePage('Concerts', 'concerts')
  end

  desc "Migrate Evening Activities"
  task :evening_activities => :environment do
    makePage('Evening Activities', 'evening_activities')
  end

  desc "Migrate Fees"
  task :fees => :environment do
    makePage('Fees', 'fees')
  end

  desc "Migrate Master Schedule"
  task :master => :environment do
    makePage('Master Schedule', 'master')
  end


  desc "Migrate Staff"
  task :staff => :environment do
    readFile('staff') { |fields|
      StaffMember.create do |s|
        s.event_id = Event.where(start_date: DateTime.parse(fields[0])).first.id
        s.user_id = User.where(username: fields[1]).first.id
        s.staff_role_id = StaffRole.where(name: fields[2]).first.id
      end
    }
  end

  desc "Migrate Classes"
  task :classes => :environment do
    readFile('classes') { |fields|
      activity = Activity.create do |a|
        a.event_id = Event.where(start_date: DateTime.parse(fields[0])).first.id
        a.title = fields[2]
        a.description = fields[3]
        a.start_time = fields[4]
        a.end_time = fields[5]
        a.difficulty_id = Difficulty.find_by(level: fields[6]).id
        a.activity_subtype_id = ActivitySubtype.find_by(name: fields[7]).id
        a.activity_type_id = ActivityType.find_by(name: fields[8]).id
        a.classroom_id = Classroom.where(event_id: a.event_id, name:fields[9]).first.id
      end

      teachers = fields[1].split(',')
      teachers.each { |teacher|
        Teacher.create do |t|
          t.user_id = User.where(username: teacher).first.id
          t.activity_id = activity.id
        end
      }
      
      
    }
  end
  desc "Add Stubs to Pages"
  task :page_stubs => :environment do
    Page.where(title: "F.A.Q.").update_all(stub: 'faq')
    Page.where(title: "Directions").update_all(stub: 'directions')
    Page.where(title: "Taverns").update_all(stub: 'taverns')
    Page.where(title: "Concerts").update_all(stub: 'concert')
    Page.where(title: "Evening Activities").update_all(stub: 'evening_activities')
    Page.where(title: "Fees").update_all(stub: 'fees')
    Page.where(title: "Master Schedule").update_all(stub: 'master')
  end

  def readFile (filename)
    path = Rails.root.join('lib','tasks',"#{filename}.tsv")
    File.readlines(path).each do |line|
      line.rstrip!
      fields = line.split("\t")
      yield(fields);
    end
  end

  def makePage (title, filename)
    readFile(filename){ |fields| 
      Page.create do |p| 
        p.title = title
        p.event_id = Event.where(start_date: DateTime.parse(fields[0])).first.id
        p.body = fields[1]
      end
    }
  end

end
