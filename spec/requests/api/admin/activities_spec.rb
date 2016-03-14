require "rails_helper"
require 'shared_contexts'
RSpec.describe "GET /api/events/:event_id/activities/unscheduled/" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"
  it "returns a list of unscheduled activities for a given event" do
    items = generate_activity 
    user = create(:user)

    sign_in(user)
    get "/api/admin/events/#{items[:event].id}/activities/unscheduled"
    expect(response.body).to eq('[]')
    items = generate_unscheduled_activity 
    get "/api/admin/events/#{items[:event].id}/activities/unscheduled"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("unscheduled")
    sign_out
  end
end
RSpec.describe "GET /api/events/:event_id/activities/scheduled/" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"
  it "returns a list of unscheduled activities for a given event" do
    items = generate_activity 
    user = create(:user)

    sign_in(user)
    get "/api/admin/events/#{items[:event].id}/activities/scheduled"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("admin_scheduled")
    sign_out
  end
end

RSpec.describe "GET /api/admin/events/:event_id/activities/" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "returns a list of activities for a given event" do
    event = create(:event)
    title = create(:title)
    user = create(:user, title_id: title.id, sca_first_name: "Mundungus", sca_last_name: "Smith")
    difficulty = create(:difficulty)
    activity_type = create(:activity_type)
    activity_subtype = create(:activity_subtype)
    activity = create(:classroom, event_id: event.id)
    activity = create(:activity, 
      activity_type_id: activity_type.id, 
      activity_subtype_id: activity_subtype.id,
      difficulty_id: difficulty.id, 
      event_id: event.id
    )
    teacher = create(:teacher, user_id: user.id, activity_id: activity.id)  

    sign_in(user)
    get "/api/admin/events/#{event.id}/activities"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("admin_activities")
    sign_out
  end
end
RSpec.describe "GET /api/admin/activities/:id" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "updates activity name for given id" do
    event = create(:event)
    title = create(:title)
    user = create(:user, title_id: title.id, sca_first_name: "Mundungus", sca_last_name: "Smith")
    difficulty = create(:difficulty)
    activity_type = create(:activity_type)
    activity_subtype = create(:activity_subtype)
    activity = create(:classroom, event_id: event.id)
    activity = create(:activity, 
      activity_type_id: activity_type.id, 
      activity_subtype_id: activity_subtype.id,
      difficulty_id: difficulty.id, 
      event_id: event.id
    )
    teacher = create(:teacher, user_id: user.id, activity_id: activity.id)  
    
    sign_in(user)
    get "/api/admin/activities/#{activity.id}"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("admin_activity")
    sign_out
  end
end
RSpec.describe "POST /api/admin/activities/" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "creates a new activity for a given event" do
    user = create(:user)
    activity = build(:activity)
    activity_params = {
      title: activity.title,
      event_id: activity.event.id,
      difficulty_id: activity.difficulty.id,
      activity_type_id: activity.activity_type.id,
      activity_subtype_id: activity.activity_subtype.id,
      duration: 60,
      users: [activity.teachers.first.user.id]
    }
    sign_in(user)
    post "/api/admin/activities", activity_params
    
    expect(response.status).to eq 201
    expect(Activity.last.title).to eq activity_params[:title]
    expect(Activity.last.difficulty_id).to eq activity.difficulty.id
    expect(Activity.last.activity_type_id).to eq activity.activity_type.id
    expect(Activity.last.activity_subtype_id).to eq activity.activity_subtype.id
    expect(Activity.last.event_id).to eq activity.event.id
    expect(Teacher.last.activity).to eq Activity.last
    expect(Teacher.last.user).to eq User.last
    sign_out
  end
end
RSpec.describe "put /api/admin/classrooms/:id" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "updates activity and teacher for given activity id" do
    event = create(:event)
    title = create(:title)
    user = create(:user, title_id: title.id)
    difficulty = create(:difficulty)
    activity_type = create(:activity_type)
    activity_subtype = create(:activity_subtype)
    activity = create(:activity, 
      activity_type_id: activity_type.id, 
      activity_subtype_id: activity_subtype.id,
      difficulty_id: difficulty.id, 
      event_id: event.id
    )
    user2 = create(:user, title_id: title.id, email: 'example201498@example.com')
   
    teacher = create(:teacher, user_id: user.id, activity_id: activity.id)  
    teacher = create(:teacher, user_id: user2.id, activity_id: activity.id)  
    
    expect(Activity.last.title).to eq activity.title
    expect(Teacher.last.activity).to eq activity
    user3 = create(:user, title_id: title.id, email: 'example201498@blah.com')



    activity_params = {
      title: 'New Activity Title',
      difficulty_id: difficulty.id,
      activity_type_id: activity_type.id,
      activity_subtype_id: activity_subtype.id,
      users: [ user2.id, user3.id]
    }

    sign_in(user)
    put "/api/admin/activities/#{activity.id}", activity_params
    
    expect(response.status).to eq 200
    expect(Activity.last.title).to eq 'New Activity Title'
    expect(Activity.last.difficulty_id).to eq difficulty.id
    expect(Teacher.count).to eq 2
    expect(Teacher.exists?(user_id: user3.id)).to eq true
    expect(Teacher.exists?(user_id: user2.id)).to eq true
    expect(Teacher.exists?(user_id: user.id)).to eq false
    sign_out
  end
end
RSpec.describe "delete /api/admin/activities/:id" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"
  it "deletes activity and teacher for given activity id" do

    event = create(:event)
    title = create(:title)
    user = create(:user, title_id: title.id)
    difficulty = create(:difficulty)
    activity_type = create(:activity_type)
    activity_subtype = create(:activity_subtype)
    activity = create(:activity, 
      activity_type_id: activity_type.id, 
      activity_subtype_id: activity_subtype.id,
      difficulty_id: difficulty.id, 
      event_id: event.id
    )
    teacher = create(:teacher, user_id: user.id, activity_id: activity.id)  

    expect(Activity.last.title).to eq activity.title
    expect(Teacher.last.activity_id).to eq activity.id
    
    sign_in(user)
    delete "/api/admin/activities/#{activity.id}"

    expect(Teacher.count).to eq 0
    expect(Activity.count).to eq 0
    sign_out
  end
end
def generate_unscheduled_activity
  event = create(:event)
  title = create(:title)
  activity_type = create(:activity_type)
  activity_subtype = create(:activity_subtype)
  difficulty = create(:difficulty)
  user = create(:user, title: title, sca_first_name: "Mundungus", sca_last_name: "Smith")
  activity = create(:activity, 
    activity_type: activity_type, 
    activity_subtype: activity_subtype, 
    title: "It's a class", 
    description: "This is the description for this class", 
    difficulty: difficulty, 
    event_id: event.id, 
    duration: 60) 

  teacher = create(:teacher, user_id: user.id, activity_id: activity.id)

  return {event: event ,teacher: teacher, activity: activity, user: user}
end
def generate_activity
  event = create(:event)
  start_time = DateTime.now
  title = create(:title)
  activity_type = create(:activity_type)
  activity_subtype = create(:activity_subtype)
  difficulty = create(:difficulty)
  user = create(:user, title: title, sca_first_name: "Mundungus", sca_last_name: "Smith")
  classroom = create(:classroom, event_id: event.id)
  activity = create(:activity, 
    activity_type: activity_type, 
    activity_subtype: activity_subtype, 
    title: "It's a class", 
    description: "This is the description for this class", 
    difficulty: difficulty, 
    event_id: event.id, 
    classroom_id: classroom.id, 
    start_time: start_time, 
    duration: 60) 

  teacher = create(:teacher, user_id: user.id, activity_id: activity.id)

  return {event: event ,teacher: teacher, activity: activity, user: user}
end
