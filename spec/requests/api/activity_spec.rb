require "rails_helper"

RSpec.describe "GET /api/activities/:id" do
  it "returns user info" do
    items = generate_activity

    get "/api/activities/#{items[:activity].id}"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("activity")
  end
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
