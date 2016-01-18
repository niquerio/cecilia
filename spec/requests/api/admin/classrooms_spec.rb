require "rails_helper"
require 'shared_contexts'

RSpec.describe "GET /cecilia/api/admin/events/:event_id/classrooms/" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "returns a list of classrooms for a given event" do
    event = create(:event)
    user = create(:user)
    classroom = create(:classroom, event_id: event.id)
    
    sign_in(user)
    get "/cecilia/api/admin/events/#{event.id}/classrooms"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("classrooms")
    sign_out
  end
end
RSpec.describe "POST /cecilia/api/admin/classrooms/" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "creates a new classroom for a given event" do
    event = create(:event)
    user = create(:user)
    classroom_params = attributes_for(:classroom)
    
    sign_in(user)
    post "/cecilia/api/admin/classrooms", {event_id: event.id, classroom: classroom_params}
    
    expect(response.status).to eq 201
    expect(Classroom.last.name).to eq classroom_params[:name]
    expect(Classroom.last.event_id).to eq event.id
    sign_out
  end
end
RSpec.describe "GET /cecilia/api/admin/classrooms/:id" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "updates classroom name for given id" do
    event = create(:event)
    user = create(:user)
    classroom = create(:classroom, event_id: event.id)
    
    sign_in(user)
    get "/cecilia/api/admin/classrooms/#{classroom.id}"
    
    expect(response.status).to eq 200
    expect(response).to match_response_schema("classroom")
    sign_out
  end
end
RSpec.describe "put /cecilia/api/admin/classrooms/:id" do
  include_context "api request authentication helper methods"
  include_context "api request global before and after hooks"

  it "updates classroom name for given id" do
    event = create(:event)
    user = create(:user)
    classroom = create(:classroom, event_id: event.id)
    
    expect(Classroom.last.name).to eq classroom.name
    sign_in(user)
    put "/cecilia/api/admin/classrooms/#{classroom.id}", classroom: {name: 'New Classroom'} 
    
    expect(response.status).to eq 200
    expect(Classroom.last.name).to eq 'New Classroom'
    sign_out
  end
end
