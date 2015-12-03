require "rails_helper"

RSpec.describe "GET /api/teachers/:username" do
  it "returns user info" do
    event = create(:event)
    user = create(:user, title: Title.find_by(name: "Lord"), sca_first_name: "Mundungus", sca_last_name: "Smith", modern_first_name: "John", modern_last_name: "Doe", bio: "I teach classes")
    
    activity = create(:activity, start_time: DateTime.now, event_id: event.id, difficulty: Difficulty.find_by(level: 3), activity_type: ActivityType.first, activity_subtype: ActivitySubtype.first)
    teacher = create(:teacher, user_id: user.id, activity_id: activity.id)

    get "/api/teachers/#{user.username}"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("teacher")
  end
end
