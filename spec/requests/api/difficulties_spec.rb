require "rails_helper"
RSpec.describe "GET /cecilia/api/difficulties/" do
  it "returns a list of difficulty levels" do
    activity_type = create(:difficulty)
    get "/cecilia/api/difficulties"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("difficulties")
  end
end
