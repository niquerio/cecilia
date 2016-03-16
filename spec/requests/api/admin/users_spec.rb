require "rails_helper"
require 'shared_contexts'

RSpec.describe "GET /api/admin/events/:event_id/users/" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "returns a list of users " do
    event = create(:event)
    user = create(:user,modern_first_name:'John',modern_last_name:'Doe')

    
    sign_in(user)
    get "/api/admin/users"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("admin_users")
    sign_out
  end
end
RSpec.describe "POST /api/admin/users/" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "creates a new user " do
    user = create(:user)
    title = create(:title)
    user_params = attributes_for(:user)
    user_params[:title_id] = title.id;
    sign_in(user)
    post "/api/admin/users", {user: user_params}
    
    expect(response.status).to eq 201
    expect(User.last.sca_first_name).to eq user_params[:sca_first_name]
    sign_out
  end
end
RSpec.describe "GET /api/admin/users/:id" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "updates user name for given id" do
    user = create(:user)
    
    sign_in(user)
    get "/api/admin/users/#{user.id}"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("admin_user")
    sign_out
  end
end
RSpec.describe "patch /api/admin/users/:id" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "updates user name for given id" do
    user = create(:user,password: Devise.friendly_token.first(8))
    
    expect(User.last.sca_first_name).to eq user.sca_first_name
    sign_in(user)
    put "/api/admin/users/#{user.id}", user: {sca_first_name: 'Archibald'} 

    expect(response.status).to eq 200
    expect(User.last.sca_first_name).to eq 'Archibald'
    sign_out
  end
end
