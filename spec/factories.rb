FactoryGirl.define do
  sequence :email do |n|
    "person#{n}@example.com"
  end

  factory :page do
    slug "page_slug"
  end

  factory :event do
    title "St. Cecilia XLL"
    start_date DateTime.now
    end_date DateTime.tomorrow
  end

  factory :user do
    email {generate :email}
    password Devise.friendly_token.first(8)  
    username "example"
  end

  factory :activity do
    title "The Best Class"
  end

  factory :classroom do
    name "Classroom One"
  end

  factory :teacher do
    user
    activity
  end

  factory :staff_member do
  end

  factory :difficulty do
    level 1
    description 'Class is appropriate for nonmusicians'
  end
  factory :title do
    name 'THL'
  end
  factory :activity_type do
    name 'Lecture'
    description 'In this class the teacher will lecture to the students' 
  end
  factory :activity_subtype do
    name 'Vocal'
    description 'This class is primarily for vocalists'
  end
  factory :staff_role do
    name 'Event Steward'
    description 'Person in charge of running the event'
  end
end
