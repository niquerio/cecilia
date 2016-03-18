require "rails_helper"
RSpec.describe "GET /api/titles/" do
  it "returns a list of activity types" do
    title = create(:title)
    get "/api/titles"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("titles")
  end
end
