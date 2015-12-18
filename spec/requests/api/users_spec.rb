require "rails_helper"
RSpec.describe "GET /api/users/" do
  it "returns a list of users" do
    title = create(:title);
    user = create(:user, username:'mundy', title: title, sca_first_name: "Mundungus", sca_last_name: "Smith")
    get "/api/users"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("users")
  end
end
