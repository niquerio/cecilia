require "rails_helper"

RSpec.describe "GET /api/events/:event_id/staff" do
  it "returns a list of staff for a given event" do
    title = create(:title)
    staff_role = create(:staff_role)
    event = create(:event)
    user = create(:user, title: title, sca_first_name: "Mundungus", sca_last_name: "Smith")
    

    staff_member = create(:staff_member, user_id: user.id, event_id: event.id, staff_role: staff_role)
    get "/api/events/#{event.id}/staff"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("staff")
  end
end
