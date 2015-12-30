require "rails_helper"
require 'shared_contexts'

RSpec.describe "GET /api/admin/events/:event_id/pages/" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "returns a list of pages for a given event" do
    user = create(:user)
    page = create(:page)
    
    sign_in(user)
    get "/api/admin/events/#{page.event_id}/pages"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("admin_pages")
    sign_out
  end
end
RSpec.describe "GET /api/admin/pages/:id" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "gets page name for given id" do
    user = create(:user)
    page = create(:page)
    
    sign_in(user)
    get "/api/admin/pages/#{page.id}"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("admin_page")
    sign_out
  end
end
RSpec.describe "put /api/admin/pages/:id" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "updates page name for given id" do
    user = create(:user)
    page = create(:page, body: 'Default Body')
 
    expect(Page.last.body).to eq page.body
    sign_in(user)
    put "/api/admin/pages/#{page.id}", page: {body: 'New Body'} 
    
    expect(response.status).to eq 200
    expect(Page.last.body).to eq 'New Body'
    sign_out
  end
end
