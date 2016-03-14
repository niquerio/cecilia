require "rails_helper"
RSpec.describe "GET /api/activity_types/" do
  it "returns a list of activity types" do
    activity_type = create(:activity_type)
    get "/api/activity_types"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("activity_types")
  end
end
