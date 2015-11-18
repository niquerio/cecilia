require "rails_helper"

RSpec.describe "GET /api/activities/:event_id" do
  it "returns a list of activities for a given event" do
    start_time = DateTime.now
    end_time = DateTime.now + 1.hour
    event = create(:event)
    user = create(:user, title: Title.find_by(name: "Lord"), sca_first_name: "Mundungus", sca_last_name: "Smith")
    classroom = create(:classroom, event_id: event.id)
    activity = create(:activity, activity_type: ActivityType.find(1), activity_subtype: ActivitySubtype.find(1), 
                  title: "It's a class", description: "This is the description for this class", difficulty: Difficulty.find(1), 
                  event_id: event.id, classroom_id: classroom.id, start_time: start_time, end_time: end_time) 

    teacher = create(:teacher, user_id: user.id, activity_id: activity.id)
    

    get "/api/activities/#{event.id}"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("activities")
  end
end
