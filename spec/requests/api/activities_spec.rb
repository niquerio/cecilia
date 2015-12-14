require "rails_helper"

RSpec.describe "GET /api/events/:event_id/activities/" do
  #generates activity with all fields and with teacher
  it "returns a list of activities for a given event" do
    items = generate_activity 

    get "/api/events/#{items[:event].id}/activities"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("activities")
  end
end
RSpec.describe "GET /api/activities/" do
  it "returns a list of activities for a given event" do
    generate_activity 

    get "/api/activities"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("all_activities")
  end
end

def generate_activity
  event = create(:event)
  start_time = DateTime.now
  end_time = DateTime.now + 1.hour
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
    end_time: end_time) 

  teacher = create(:teacher, user_id: user.id, activity_id: activity.id)

  return {event: event ,teacher: teacher, activity: activity, user: user}
end
