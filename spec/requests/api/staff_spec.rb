require "rails_helper"

RSpec.describe "GET /api/events/:event_id/staff" do
  it "returns a list of staff for a given event" do
    event = create(:event)
    user = create(:user, title: Title.find_by(name: "Lord"), sca_first_name: "Mundungus", sca_last_name: "Smith")
    

    staff_member = create(:staff_member, user_id: user.id, event_id: event.id, staff_role: StaffRole.find(1))
    get "/api/events/#{event.id}/staff"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("staff")
  end
end
