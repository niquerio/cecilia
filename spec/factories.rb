FactoryGirl.define do
  factory :page do
    slug "page_slug"
  end

  factory :event do
    title "St. Cecilia XLL"
    start_date DateTime.now
    end_date DateTime.tomorrow
  end

  factory :user do
    email "example@example.com"
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
  end

  factory :staff_member do
  end
end
