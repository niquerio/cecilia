require "rails_helper"

RSpec.describe "GET /api/activities/:id" do
  it "returns user info" do
    event = create(:event)
    user = create(:user, username: "mundy", title: Title.find_by(name: "Lord"), sca_first_name: "Mundungus", sca_last_name: "Smith", modern_first_name: "John", modern_last_name: "Doe", bio: "I teach classes")
    classroom = create(:classroom, name:'Nursery'); 
    activity = create(:activity, title: 'Title', start_time: DateTime.now, end_time: DateTime.now + 1.hour, description: 'Description', event_id: event.id, classroom: classroom, difficulty: Difficulty.find_by(level: 3), activity_type: ActivityType.first, activity_subtype: ActivitySubtype.first)
    teacher = create(:teacher, user_id: user.id, activity_id: activity.id)

    get "/api/activities/#{teacher.id}"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("activity")
  end
end
