require "rails_helper"

RSpec.describe "GET /api/pages/:slug/events/:event_id" do
  it "returns title and body of given page" do
    event = create(:event)
    page = create(:page, title: "Directions", body: "Here's How to get to place", slug: "directions", event_id: event.id)

    get "/api/pages/#{page.slug}/events/#{event.id}"

    expect(response.status).to eq 200
    expect(response).to match_response_schema("page")
  end
end
