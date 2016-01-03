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

  desc "Migrate Home"
  task :home => :environment do
    makePage('', 'home','old_data/home/home')
  end
  desc "Migrate FAQ"
  task :faq => :environment do
    makePage('F.A.Q.', 'faq','old_data/faq/faq')
  end

  desc "Migrate Directions"
  task :directions => :environment do
    makePage('Directions', 'directions', 'old_data/directions/directions')
  end

  desc "Migrate Food"
  task :food => :environment do
    makePage('Taverns', 'taverns', 'old_data/food/food')
  end

  desc "Migrate Concerts"
  task :concerts => :environment do
    makePage('Concert', 'concert', 'old_data/concerts/concerts')
  end

  desc "Migrate Evening Activities"
  task :evening_activities => :environment do
    makePage('Evening Activities', 'evening_activities', 'old_data/evening_activities/evening_activities')
  end

  desc "Migrate Fees"
  task :fees => :environment do
    makePage('Fees', 'fees', 'old_data/fees/fees')
  end

  desc "Migrate Master Schedule"
  task :master => :environment do
    makePage('Master Schedule', 'master', 'old_data/master/master')
  end

  desc "Migrate Lodging"
  task :lodging => :environment do
    makePage('Lodging', 'lodging', 'old_data/lodging/lodging')
  end

  desc "Migrate Salon"
  task :salon => :environment do
    makePage('Salon', 'salon', 'old_data/salon/salon')
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
        #a.end_time = fields[5]
        a.duration = ((Time.parse(fields[5]) - Time.parse(fields[4]))/1.minute).round
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

  desc "reset db and reload seed"
  task :db_reset => :environment do
    Rake::Task['db:reset'].invoke 
    Rake::Task['db:migrate'].invoke 
    Rake::Task['db:seed'].invoke 
  end

  task :all => [:db_reset, :users, :events, :classrooms, :home, :faq, :directions, :food, :concerts, :evening_activities,
      :fees, :master, :lodging, :staff, :classes, :salon ]

  def readFile (filename)
    path = Rails.root.join('lib','tasks',"#{filename}.tsv")
    File.readlines(path).each do |line|
      line.rstrip!
      fields = line.split("\t")
      yield(fields);
    end
  end

  def makePage (title, slug, filename)
    readFile(filename){ |fields| 
      file = File.open(Rails.root.join('lib','tasks',fields[1]))
      Page.create do |p| 
        p.title = title
        p.slug = slug
        p.event_id = Event.where(start_date: DateTime.parse(fields[0])).first.id
        p.body = file.read 
      end
      file.close
    }
  end

end
