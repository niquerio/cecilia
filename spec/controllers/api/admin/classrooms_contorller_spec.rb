require "rails_helper"

RSpec.describe Api::Admin::ClassroomsController, "#index" do
  context "when event is given and user is not signed in" do
    it "returns 302 redirect" do
      event = create(:event)
      get :index, {:event_id => event.id}
      expect(response.status).to eq 302
    end
  end
end
RSpec.describe Api::Admin::ClassroomsController, "#create" do
  context "empty classroom name" do
    it "returns 422 unprocessable entity" do
      event = create(:event)
      user = create(:user)
      sign_in user
      post :create, {:event_id => event.id, :classroom => {name: ''}}
      expect(response.status).to eq 422
      expect(response.body).to include("Name can't be blank")
      sign_out user
    end
  end
end
RSpec.describe Api::Admin::ClassroomsController, "#update" do
  context "empty classroom name" do
    it "returns 422 unprocessable entity" do
      event = create(:event)
      classroom = create(:classroom, event_id: event.id)
      user = create(:user)
      sign_in user
      put :update, {id: classroom.id, :classroom => {name: ''}}
      expect(response.status).to eq 422
      expect(response.body).to include("Name can't be blank")
      sign_out user
    end
  end
end
