require "rails_helper"
RSpec.describe "GET /api/activity_subtypes/" do
  it "returns a list of activity subtypes" do
    activity_subtype = create(:activity_subtype)
    get "/api/activity_subtypes"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("activity_types")
  end
end
